"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, UserProfile, FeedPost, FavoriteElement, Like, Follower, MediaFile
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
import cloudinary.uploader


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/users', methods=['POST'])
def sign_up():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No se enviaron datos"}), 400
    required_fields = ['username', 'email', 'password_hash', 'role']
    if not all(field in data for field in required_fields):
        return jsonify({"message": "Datos incompletos"}), 400
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"message": "Ya existe un usuario con ese email"}), 409

    try:
        hashed_password = generate_password_hash(data['password_hash'])

        new_user = User(
            username=data['username'],
            email=data['email'],
            password_hash=hashed_password,
            role=data['role']
        )

        db.session.add(new_user)

        db.session.commit()

        return jsonify({
            "message": "Usuario creado con éxito",
            "user": new_user.serialize,
        }), 201
    except Exception as e:
        db.session.rollback()
        import traceback
        traceback.print_exc()
        print(f"Error al crear usuario: {e}")
        return jsonify({
            "message": "Internal Server Error",
            "error": str(e)
        }), 500


@api.route('/users', methods=['GET'])
def get_all_users():
    try:
        users = User.query.all()
        return jsonify([user.serialize for user in users]), 200

    except Exception as e:
        print(f"Error al obtener los usuario: {e}")
        return jsonify({"msg": "Internal Server Error", "error": str(e)}),


@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        user = User.query.get(user_id)
        if user:
            return jsonify(user.serialize)
    except Exception as e:
        return jsonify({"message": "Usuario no encontrado"}), 404


@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.get_json()
        user = User.query.get(user_id)
        if user:
            user.username = data.get('username', user.username)
            user.email = data.get('email', user.email)
            user.password_hash = data.get('password', user.password_hash)
            user.role = data.get('role', user.role)
            db.session.commit()
            return jsonify(user.serialize), 200
        return jsonify({"message": "Usuario no encontrado"}), 400

    except Exception as e:
        return jsonify({"msg": "Internal Server Error",
                        "error": str(e)
                        }), 500


@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"message": "Usuario eliminado con éxito"}), 200
        return jsonify({"message": "No se pudo eliminar al usuario"}), 400

    except Exception as e:
        return jsonify({"msg": "Internal Server Error",
                        "error": str(e)
                        }), 500


@api.route('/user_profiles', methods=['POST'])
def create_profile():
    try:
        data = request.get_json()
        new_profile = UserProfile(
            user_id=data['user_id'],
            display_name=data['display_name'],
            updated_at=datetime.now(),
            bio=data['bio'],
            genre=data['genre'],
            instrument=data['instrument'],
            founded_year=data['founded_year'],
            enterprise_type=data['enterprise_type'],
            location=data['location'],
            profile_image_url=data['profile_image_url'],
            website_url=data['website_url']
        )
        db.session.add(new_profile)
        db.session.commit()
        return jsonify(new_profile.serialize), 201

    except Exception as e:
        return jsonify({"msg": "Internal Server Error",
                        "error": str(e)
                        }), 500


@api.route('/user_profiles', methods=['GET'])
def get_all_profiles():
    try:
        profiles = UserProfile.query.all()
        return jsonify([profile.serialize for profile in profiles]), 200

    except Exception as e:
        return jsonify({"msg": "Internal Server Error",
                        "error": str(e)
                        }), 500


@api.route('/user_profiles', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user = get_jwt_identity() 
        print(current_user)
        profile = UserProfile.query.filter_by(email=current_user).first
        print(profile)
        if not profile:
            return jsonify({"msg": "usuario no encontrado"}), 404
        user_profile = profile.profile
        if not profile:
            return jsonify({"message": "Perfil no encontrado"}), 404
        return jsonify(user_profile.serialize()), 200

    except Exception as e:
        return jsonify({"msg": "Internal Server Error",
                        "error": str(e)
                        }), 500


@api.route('/user_profiles/<int:profile_id>', methods=['PUT'])
def update_profile(profile_id):
    try:
        data = request.get_json()
        profile = UserProfile.query.get(profile_id)
        if profile:
            profile.display_name = data.get(
                'display_name', profile.display_name)
            profile.bio = data.get('bio', profile.bio)
            profile.genre = data.get('genre', profile.genre)
            profile.instrument = data.get('instrument', profile.instrument)
            profile.founded_year = data.get(
                'founded_year', profile.founded_year)
            profile.enterprise_type = data.get(
                'enterprise_type', profile.enterprise_type)
            profile.location = data.get('location', profile.location)
            profile.profile_image_url = data.get(
                'profile_image_url', profile.profile_image_url)
            profile.website_url = data.get('website_url', profile.website_url)
            db.session.commit()
            return jsonify(profile.serialize), 200
        return jsonify({"message": "Perfil no encontrado"}), 404
    except Exception as e:
        return jsonify({"msg": "Internal Server Error",
                        "error": str(e)
                        }), 500


@api.route('/user_profiles/<int:profile_id>', methods=['DELETE'])
def delete_profile(profile_id):
    try:
        profile = UserProfile.query.get(profile_id)
        if profile:
            db.session.delete(profile)
            db.session.commit()
            return jsonify({"message": "Perfil de usuario eliminado con éxito"}), 200
        return jsonify({"message": "Perfil de usuario no encontrado"}), 404
    except Exception as e:
        return jsonify({"msg": "Internal Server Error",
                        "error": str(e)
                        }), 500


@api.route('/feed_posts/', methods=['POST'])
def create_post():
    data = request.get_json()
    if not data or 'user_id' not in data or 'content_text' not in data:
        return jsonify({"message": "Datos incompletos"}), 400
    try:
        data = request.get_json()
        new_post = FeedPost(
            user_id=data['user_id'],
            content_text=data['content_text'],
            updated_at=datetime.now(),
            image_url=data.get('image_url'),
            publish_home=data.get('publish_home', True)

        )
        db.session.add(new_post)
        db.session.commit()
        return jsonify({"post": new_post.serialize, "message": "Post was Created"}), 201

    except Exception as e:
        return jsonify({"Internal Server Error": str(e)}), 500


@api.route('/feed_posts', methods=['GET'])
def get_all_posts():
    try:

        posts = FeedPost.query.all()
        if posts:

            return jsonify([post.serialize for post in posts]), 200

        return jsonify({"message": "Post no encontrado"}), 404

    except Exception as e:
        return jsonify({"Internal Server Error": str(e)}), 500


@api.route('/feed_posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    try:
        post = FeedPost.query.get(post_id)
        if post:
            return jsonify({"post": post.serialize, "message": "Post Encontrado Con Éxito"}), 201
        return jsonify({"message": "Post no encontrado"}), 400
    except Exception as e:
        return jsonify({"Internal Server Error": str(e)}), 500


@api.route('/feed_posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    try:
        data = request.get.json()
        post = post.query.get(post_id)
        if post:
            post.content_text = data.get('content_text', post.content_text)
            db.session.commit()
            return jsonify(post.serialize), 200
        return jsonify({"message": "No se pudo actualizar el post"}), 400

    except Exception as e:
        return jsonify({"Internal Server Error": str(e)}), 500


@api.route('/feed_posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    try:
        post = FeedPost.query.get(post_id)
        if post:
            db.session.delete(post)
            db.session.commit()
            return jsonify({"message": "Post eliminado con éxito"}), 200
        return jsonify({"message": "No se pudo eliminar el post"}), 404
    except Exception as e:
        return jsonify({"Internal Server Error": str(e)}), 500


@api.route('/feed_posts/<int:post_id>/likes', methods=['POST'])
@jwt_required()
def like_post(post_id):
    data = request.get_json()

    if not data or 'user_id' not in data:
        return jsonify({"message": "User ID requeridos"}), 400

    user_id = get_jwt_identity()

    try:
        post = FeedPost.query.get(post_id)
        if not post:
            return jsonify({"message": "Post no encontrado"}), 404

        existing_like = Like.query.filter_by(
            user_id=user_id,
            post_id=post_id
        ).first()

        if existing_like:
            return jsonify({"message": "El usuario ya dio like a este post"}), 409

        new_like = Like(
            user_id=user_id,
            post_id=post_id
        )

        post.likes_count += 1

        db.session.add(new_like)
        db.session.commit()

        return jsonify(new_like.serialize), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route("/feed_posts/<int:post_id>/likes", methods=["DELETE"])
def unlike_post(post_id):
    data = request.get_json()

    if not data or 'user_id' not in data:
        return jsonify({"message": "User ID requerido"}), 400

    user_id = data['user_id']

    try:
        post = FeedPost.query.get(post_id)
        if not post:
            return jsonify({"message": "Post no encontrado"}), 404

        existing_like = Like.query.filter_by(
            user_id=user_id,
            post_id=post_id
        ).first()

        if not existing_like:
            return jsonify({"message": "El like no existe"}), 404

        db.session.delete(existing_like)

        if post.likes_count > 0:
            post.likes_count -= 1

        db.session.commit()

        return jsonify({"message": "Like eliminado correctamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@api.route('/feed_posts/favorites', methods=['POST'])
@jwt_required()
def create_favorite():
    data = request.get_json()
    user_id = get_jwt_identity()
    if not data or 'element_type' not in data or 'element_id' not in data:
        return jsonify({"message": "Datos Incompletos"}), 404
    try:
        new_favorite = FavoriteElement(
            user_id=user_id,
            element_type=data['element_type'],
            element_id=data['element_id']
        )
        db.session.add(new_favorite)
        db.session.commit()
        return jsonify(new_favorite.serialize), 201
    except Exception as e:
        return jsonify({"Internal Server Error": str(e)}), 500


@api.route('/feed_posts/favorites/<int:favorite_id>', methods=['DELETE'])
@jwt_required()
def delete_favorites(favorite_id):
    user_id = get_jwt_identity()
    try:
        favorites = FavoriteElement.query.filter_by(
            favorite_id=favorite_id, user_id=user_id).first()
        if favorites:
            db.session.delete(favorites)
            db.session.commit()
            return jsonify({"message": "Favorito eliminado con éxito"}), 200
        return jsonify({"message": "Favorito No Encontrado"}), 404

    except Exception as e:
        return jsonify({"Internal Server Error": str(e)}), 500


@api.route('/feed_posts/mediafile', methods=["POST"])
def add_media():
    data = request.get_json()
    try:
        if not data or "file_url" not in data or "file_type" not in data:
            return jsonify({"msg": "file_url y file_type son requeridos"}), 400

        media = MediaFile(
            post_id=data['post_id'],
            file_url=data["file_url"],
            file_type=data["file_type"]
        )

        db.session.add(media)
        db.session.commit()

        return jsonify(media.serialize), 200

    except Exception as e:
        return jsonify({"Internal Server Error": str(e)}), 500


@api.route('/feed_posts/mediafile/<int:media_id>', methods=["PUT"])
def update_media(media_id):

    try:
        data = request.get_json()
        media = MediaFile.query.get(media_id)
        if media:
            media.file_url = data.get('file_url', media.file_url)
            media.file_type = data.get('file_type', media.file_type)
            db.session.commit()
            return jsonify(media.serialize), 200
        return jsonify({"message": "No se pudo actualizar"}), 400

    except Exception as e:
        return jsonify({"Internal Server Error": str(e)}), 500


@api.route('/feed_posts/mediafile/<int:media_id>', methods=["DELETE"])
def delete_media(media_id):
    try:
        media = MediaFile.query.get(media_id)
        if media:
            db.session.delete(media)
            db.session.commit()
            return jsonify({"message": "Eliminado con éxito"}), 200
        return jsonify({"message": "No se pudo eliminar"}), 404

    except Exception as e:
        return jsonify({"Internal Server Error": str(e)}), 500


@api.route("/users/followers", methods=["POST"])
def follow_user():
    data = request.get_json()
    try:
        if not data or "follower_id" not in data or "followed_id" not in data:
            return jsonify({"msg": "Datos incompletos"}), 400

        follow = Follower(
            follower_id=data["follower_id"],
            followed_id=data["followed_id"],
            updated_at=datetime.now()

        )

        db.session.add(follow)
        db.session.commit()

        return jsonify(follow.serialize), 201

    except Exception as e:
        return jsonify({"Internal Server Error": str(e)}), 500


@api.route("/users/followers/<int:user_id>", methods=["DELETE"])
def unfollow_user(user_id):
    data = request.get_json()
    try:
        follow = Follower.query.filter_by(
            follower_id=data["follower_id"],
            followed_id=data["followed_id"]

        ).first()

        if not follow:
            return jsonify({"msg": "Relación no encontrada"}), 404

        db.session.delete(follow)
        db.session.commit()
        return jsonify({"msg": "Unfollow exitoso"}), 200
    except Exception as e:
        return jsonify({"Internal Server Error": str(e)}), 500


# @api.route("/login", methods=["POST"])
# def login():
#     data = request.get_json()
#     user = User.query.filter_by(email=data["email"].lower()).first()

#     if not user or not check_password_hash(user.password_hash, data["password_hash"]):
#       return  jsonify({"msg": " Email o Contraseña Invalidas"}), 401

#     access_token = create_access_token(identity=str(user.user_id))
#     return jsonify({"token": access_token,
#                     "message": "Logueado Con Éxito",
#                     "user": user.serialize}), 200

@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data or "email" not in data or "password_hash" not in data:
        return jsonify({"msg": "Datos incompletos"}), 400

    user = User.query.filter_by(email=data["email"].lower()).first()

    if not user:
        return jsonify({"msg": "Usuario no existe"}), 404

    if not check_password_hash(user.password_hash, data["password_hash"]):
        return jsonify({"msg": "Contraseña incorrecta"}), 401

    access_token = create_access_token(identity=str(user.email))

    return jsonify({
        "token": access_token,
        "message": "logged in ssuccesfully",
        "user": user.serialize

    }), 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@api.route('/uploadimg', methods=['POST'])
def upload_image():
    file = request.files['image']
    result = cloudinary.uploader.upload(file)
    return result["secure_url"]


if __name__ == '__main__':
    api.run(debug=True)

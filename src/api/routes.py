"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint 
from api.models import db, User, UserProfile, FeedPost, FavoriteElement, MediaFile, Follower, Like
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

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
def create_user():
    try:
       data = request.get_json()
       new_user = User(
       username=data['username'],
       email=data['email'],
       password_hash=data['password_hash'],  # Asegúrate de usar un hash para la contraseña
       role=data['role']
       
    )
       db.session.add(new_user)
       db.session.commit()
       return jsonify(new_user.serialize), 201

    except Exception as e:
        print(f"Error al crear usuario: {e}")
        return jsonify({"msg": "Internal Server Error", "error": str(e)}), 500 

@api.route('/users', methods=['GET'])
def get_users():
    try:    
       users = User.query.all()
       return jsonify([user.serialize for user in users])
    
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
        return jsonify(user.serialize)
    except Exception as e:   
     return jsonify({"message": "Usuario no encontrado"}), 404
    
@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
        try:   
            user = User.query.get(user_id)
            if user:
             db.session.delete(user)
             db.session.commit()
            return jsonify({"message": "User deleted successfully"}), 200
        except Exception as e:  
          return jsonify({"message": "Usuario no encontrado"}), 404
        
@api.route('/user_profiles', methods=['POST'])
def create_profile():
    try:
       data = request.get_json()
       new_profile = UserProfile(
        user_id=data['user_id'],
        display_name=data['display_name'],
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
          return jsonify({"message": "No se pudo crear el perfil de usuario"}), 404
    

@api.route('/user_profiles', methods=['GET'])
def get_profiles():
    try:
       profiles = UserProfile.query.all()
       return jsonify([profile.serialize for profile in profiles])
    
    except Exception as e:
        print(f"Error al obtener los perfiles de usuario: {e}")
        return jsonify({"msg": "Perfiles no encontrados"}), 400  
    

@api.route('/user_profiles/<int:profile_id>', methods=['GET'])
def get_profile(profile_id):
    try:
       profile = UserProfile.query.get(profile_id)
       if profile:
        return jsonify(profile.serialize)
    
    except Exception as e:
     return jsonify({"message": "Perfil no encontrado"}), 404

@api.route('/user_profiles', methods=['PUT'])
def update_profile(profile_id):     
    try:
         data =  request.get.json()
         profile = UserProfile.query.get(profile_id)
         if profile:
            profile.display_name=data.get('display_name', profile.display_name),
            profile.bio=data.get('bio', profile.bio),
            profile.genre=data.get('genre', profile.genre),
            profile.instrument=data.get('instrument', profile.instrument),
            profile.founded_year=data.get('founded_year',profile.founded_year),
            profile.enterprise_type=data.get('enterprise_type', profile.enterprise_type),
            profile.location=data.get('location', profile.location),
            profile.profile_image_url=data.get('profile_image_url', profile.profile_image_url),
            profile.website_url=data.get('website_url', profile.website_url)
            db.session.commit()
            return jsonify(profile.serialize), 200
    except Exception as e:   
     return jsonify({"message": "Perfil no encontrado"}), 404
    
@api.route('/feed_posts', methods=['POST'])
def create_post():
    try:
       data = request.get_json()
       new_post = FeedPost(
          user_id=data['user_id'],
          content_text=data['content_text']
    )
       db.session.add(new_post)
       db.session.commit()
       return jsonify(new_post.serialize)({"message": "Post creado"}), 201
    
    except Exception as e:   
     return jsonify({"message": "Error en crear el post "}), 404
    

@api.route('/feed_posts', methods=['GET'])
def get_all_posts():
    try: 

       posts = FeedPost.query.all()
       return jsonify([post.serialize for post in posts])

    except Exception as e:   
     return jsonify({"message": "Post no encontrado "}), 404


@api.route('/feed_posts', methods=['PUT'])
def update_posts(post_id):
    try: 
        data = request.get.json()
        post = post.query.get(post_id)
        if post:
           post.content_text = data.get('content_text', post.content_text)
           db.session.commit()
           return (post.serialize), 200
            
    except Exception as e:   
     return jsonify({"message": "No se pudo actualizar el post"}), 404

@api.route('/feed_posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    try:
       post = FeedPost.query.get(post_id)
       if post:
           return jsonify(post.serialize)
    except Exception as e:   
       return jsonify({"message": "Post no encontrado"}), 404

@api.route('/favorite_elements', methods=['POST'])
def create_favorite():
    try:
       data = request.get_json()
       new_favorite = FavoriteElement(
           user_id=data['user_id'],
           element_type=data['element_type'],
           element_id=data['element_id']
    )
       db.session.add(new_favorite)
       db.session.commit()
       return jsonify(new_favorite.serialize), 201
    except Exception as e:   
       return jsonify({"message": "Error al crear favoritos"}), 404


@api.route('/users/<int:user_id>/favorites', methods=['GET'])
def get_favorites(user_id):
    try:
       favorites = FavoriteElement.query.filter_by(user_id=user_id).all()
       return jsonify([favorite.serialize for favorite in favorites])
    
    except Exception as e:   
       return jsonify({"message": ""}), 404



if __name__ == '__main__':
    api.run(debug=True)      




 
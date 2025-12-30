"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint 
from api.models import db, User, UserProfile, FeedPost, FavoriteElement
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime

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
      
    data = request.get_json() 

    if "username" not in data or "email" not in data or "password" not in data or "role" not in data:
       return jsonify({"message": "Datos Incompletos"}), 400
    
    user_exist = User.query.filter_by(email=data["email"]).first()
    if user_exist:
       return jsonify({"message": "No se pudo registrar el usuario"}), 400
       
    try:
     
       new_user = User(
       username=data['username'],
       email=data['email'],
       password_hash=data['password'],  # Asegúrate de usar un hash para la contraseña
       role=data['role']
       
    )
       db.session.add(new_user)
       db.session.commit()
       return jsonify(new_user.serialize), 201
       
       

    except Exception as e:
        print(f"Error al crear usuario: {e}")
        return jsonify({"Internal Server Error" : str(e)}), 500


@api.route('/users', methods=['GET'])
def get_users():
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
def get_profiles():
    try:
       profiles = UserProfile.query.all()
       return jsonify([profile.serialize for profile in profiles]), 200
    
    except Exception as e:
       return jsonify({"msg": "Internal Server Error",
            "error": str(e)
        }), 500  
    

@api.route('/user_profiles/<int:profile_id>', methods=['GET'])
def get_profile(profile_id):
    try:
       profile = UserProfile.query.get(profile_id)
       if profile:
        return jsonify(profile.serialize), 200
       return jsonify({"message": "Perfil no encontrado"}), 404
    
    except Exception as e:
     return jsonify({"msg": "Internal Server Error",
            "error": str(e)
        }), 500  


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
         return jsonify({"message": "Perfil no encontrado"}), 404
    except Exception as e:   
     return jsonify({"msg": "Internal Server Error",
            "error": str(e)
        }), 500  
    

@api.route('/user_profile/<int:profile_id>', methods=['DELETE'])
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
          updated_at=datetime.now(),
          content_text=data['content_text']
    )
       db.session.add(new_post)
       db.session.commit()
       return jsonify({"post":new_post.serialize,"message": "Post Creado" }), 201
    
    except Exception as e:   
     return jsonify({"Internal Server Error" : str(e)}), 500
    

@api.route('/feed_posts', methods=['GET'])
def get_all_posts():
    try: 

       posts = FeedPost.query.all()
       if posts:
        
        return jsonify([post.serialize for post in posts]), 200
       
       return jsonify({"message": "Post no encontrado"}), 404

    except Exception as e:   
     return jsonify({"Internal Server Error" : str(e)}), 500


@api.route('/feed_posts/<int:post_id>', methods=['GET']) 
def get_post(post_id):
    try:
       post = FeedPost.query.get(post_id)
       if post:
           return jsonify({"post":post.serialize,"message": "Post Encontrado Con Éxito" }), 201
       return jsonify ({"message": "Post no encontrado"}), 400
    except Exception as e:   
        return jsonify({"Internal Server Error" : str(e)}), 500

@api.route('/feed_posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    try: 
        data = request.get.json()
        post = post.query.get(post_id)
        if post:
           post.content_text = data.get('content_text', post.content_text)
           db.session.commit()
           return jsonify (post.serialize), 200
        return jsonify ({"message": "No se pudo actualizar el post"}), 400
            
    except Exception as e:   
     return jsonify({"Internal Server Error" : str(e)}), 500
    

@api.route("/login", methods=["POST"])
def login():
    body = request.get_json()
    if not body:
        return jsonify({"msg": "No data received"}), 400

    user = User.query.filter_by(email=body["email"]).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    if user.password != body["password"]: 
        return jsonify({"msg": "Wrong password"}), 401

    profile = UserProfile.query.filter_by(user_id=user.id).first()
    profile_id = profile.id if profile else None  

    return jsonify({
        "user_id": user.id,
        "profile_id": profile_id
    }), 200



# @api.route('/feed_posts/<int:post_id>', methods=['GET'])
# def get_post(post_id):
#     try:
#        post = FeedPost.query.get(post_id)
#        if post:
#              db.session.delete(post)
#              db.session.commit()
#              return jsonify({"message": "Post eliminado con éxito"}), 200
#        return jsonify ({"message": "No se pudo eliminar el ppost"}), 404
#     except Exception as e:  
#         return jsonify({"Internal Server Error" : str(e)}), 500  





if __name__ == '__main__':
    api.run(debug=True)      




 
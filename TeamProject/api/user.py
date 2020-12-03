from api import api
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from controllers.user_con import *


# 회원가입
@api.route("/sign_up", methods=["POST"])
def sign_up():
    return sign_up_con(request)


# 로그인 api
@api.route("/login", methods=["POST"])
def login():
    return login_con(request.get_json())


# 유저 정보 반환
@api.route("/user_info", methods=["GET"])
@jwt_required
def user_info():
    return user_info_con(get_jwt_identity())


# 아이디 삭제, 수정, id(primary key)값에 따른 정보확인
@api.route("/users/<id>", methods=["GET", "PUT", "DELETE"])
@jwt_required
def user_detail(id):
    return user_datail_con(get_jwt_identity(), id)


# id로 프로필, 닉네임, 이메일(특정정보) 불러오는 api
@api.route("/user_specific_info/<id>")
def users_specific_info(id):
    return user_specific_info_con(id)

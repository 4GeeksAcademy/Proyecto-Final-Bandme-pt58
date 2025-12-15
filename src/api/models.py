from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Enum, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__= "users"

    user_id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    password_hash: Mapped[str] = mapped_column(String(50), nullable=False)
    role: Mapped[str] = mapped_column(Enum("musician", "band", "enterprise", name="user_roles"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, onupdate=func.now())

    profile = relationship("UserProfile", back_populates="user", uselist=False)
    posts = relationship("FeedPost", back_populates="author")
    likes = relationship("Like", back_populates="user")
    favorites = relationship("FavoriteElement", back_populates="user")

    def serialize(self):
        return{
        "user_id": self.user_id,
        "username": self.username,
        "email": self.email,
        "role": self.role,
        "created_at": self.created_at.isoformat() if self.created_at else None,
        "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
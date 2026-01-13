from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Enum, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from datetime import datetime


db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    user_id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(
        String(50), nullable=True, unique=True)
    email: Mapped[str] = mapped_column(String(50), nullable=True, unique=True)
    password_hash: Mapped[str] = mapped_column(String(400), nullable=True)
    role: Mapped[str] = mapped_column(
        Enum("musician", "band", "enterprise", name="user_roles"), nullable=False)
    profile_image_url: Mapped[str] = mapped_column(String(500), nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now(), onupdate=func.now(), nullable=True)

    profile = relationship("UserProfile", back_populates="user", uselist=False)
    posts = relationship("FeedPost", back_populates="author")
    likes = relationship("Like", back_populates="user")
    favorites = relationship("FavoriteElement", back_populates="user")

    @property
    def serialize(self):
        return {
            "user_id": self.user_id,
            "username": self.username,
            "email": self.email,
            "role": self.role,
            "profile_image_url": self.profile_image_url,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "profile": self.profile.serialize if self.profile else None,
        }


class UserProfile(db.Model):
    __tablename__ = "user_profiles"

    profile_id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.user_id"), nullable=False)

    display_name: Mapped[str] = mapped_column(String(100), nullable=True)
    bio: Mapped[str] = mapped_column(Text)
    genre: Mapped[str] = mapped_column(String(50))
    instrument: Mapped[str] = mapped_column(String(50))
    founded_year: Mapped[int] = mapped_column(Integer)
    enterprise_type: Mapped[str] = mapped_column(String(50))
    location: Mapped[str] = mapped_column(String(100))
    profile_image_url: Mapped[str] = mapped_column(String(255))
    website_url: Mapped[str] = mapped_column(String(200))

    created_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, onupdate=func.now())

    user = relationship("User", back_populates="profile")

    @property
    def serialize(self):
        return {
            "profile_id": self.profile_id,
            "user_id": self.user_id,
            "display_name": self.display_name,
            "bio": self.bio,
            "genre": self.genre,
            "instrument": self.instrument,
            "founded_year": self.founded_year,
            "enterprise_type": self.enterprise_type,
            "location": self.location,
            "profile_image_url": self.profile_image_url,
            "website_url": self.website_url,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }


class FeedPost(db.Model):
    __tablename__ = "feed_posts"

    post_id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.user_id"), nullable=False)
    publish_home: Mapped[bool] = mapped_column(Boolean, default=False)
    content_text: Mapped[str] = mapped_column(Text)
    image_url = db.Column(db.String(255))
    publish_home = db.Column(db.Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime, onupdate=func.now())
    likes_count: Mapped[int] = mapped_column(Integer, default=0)
    comments_count: Mapped[int] = mapped_column(Integer, default=0)

    author = relationship("User", back_populates="posts")
    media_files = relationship("MediaFile", back_populates="post")
    likes = relationship("Like", back_populates="post")

    @property
    def serialize(self):
        return {
            "post_id": self.post_id,
            "user_id": self.user_id,
            "content_text": self.content_text,
            "image_url": self.image_url,
            "publish_home": self.publish_home,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "likes_count": self.likes_count,
            "media_files": [m.serialize for m in self.media_files],
            "author_username": self.author.username if self.author else "Musician", "author_email": self.author.email if self.author else "no-email@bandme.com"

        }


class MediaFile(db.Model):
    __tablename__ = "media_files"

    media_id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)
    post_id: Mapped[int] = mapped_column(
        ForeignKey("feed_posts.post_id"), nullable=False)

    file_url: Mapped[str] = mapped_column(String(500), nullable=False)
    file_type: Mapped[str] = mapped_column(
        Enum("image", "video", "audio", name="media_types"))
    public_id: Mapped[str] = mapped_column(String(200), nullable=False)
    uploaded_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now())

    post = relationship("FeedPost", back_populates="media_files")

    @property
    def serialize(self):
        return {
            "media_id": self.media_id,
            "post_id": self.post_id,
            "file_url": self.file_url,
            "file_type": self.file_type,
            "uploaded_at": self.uploaded_at.isoformat() if self.uploaded_at else None
        }


class Follower(db.Model):
    __tablename__ = "followers"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)

    follower_id: Mapped[int] = mapped_column(
        ForeignKey("users.user_id"), nullable=False
    )
    followed_id: Mapped[int] = mapped_column(
        ForeignKey("users.user_id"), nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now())

    __table_args__ = (
        db.UniqueConstraint("follower_id", "followed_id",
                            name="uq_follower_pair"),
    )

    follower = relationship("User", foreign_keys=[follower_id])
    followed = relationship("User", foreign_keys=[followed_id])

    @property
    def serialize(self):
        return {
            "id": self.id,
            "follower_id": self.follower_id,
            "followed_id": self.followed_id,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }


class Like(db.Model):
    __tablename__ = "likes"

    like_id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.user_id"), nullable=False)
    post_id: Mapped[int] = mapped_column(
        ForeignKey("feed_posts.post_id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=func.now())

    __table_args__ = (
        db.UniqueConstraint('user_id', 'post_id',
                            name='unique_user_post_like'),
    )

    user = relationship("User", back_populates="likes")
    post = relationship("FeedPost", back_populates="likes")

    @property
    def serialize(self):
        return {
            "like_id": self.like_id,
            "user_id": self.user_id,
            "post_id": self.post_id,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }


class FavoriteElement(db.Model):
    __tablename__ = "favorite_elements"

    favorite_id: Mapped[int] = mapped_column(
        Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.user_id"), nullable=False)

    element_type: Mapped[str] = mapped_column(
        Enum("post", "user", "event", name="favorite_types"))
    element_id: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now())

    user = relationship("User", back_populates="favorites")

    @property
    def serialize(self):
        return {
            "favorite_id": self.favorite_id,
            "user_id": self.user_id,
            "element_type": self.element_type,
            "element_id": self.element_id,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }

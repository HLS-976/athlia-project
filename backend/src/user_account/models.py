import uuid
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, user_name, first_name, last_name, **extra_fields):
        if not email:
            raise ValueError("The email is required")
        if not user_name:
            raise ValueError("The user name is required")
        if not first_name:
            raise ValueError("The first name is required.")
        if not last_name:
            raise ValueError("The last name is required.")

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name, first_name=first_name, last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save()
        return user


    def create_superuser(self, email, password, user_name, first_name, last_name, **extra_fields):
        if not first_name:
            raise ValueError("The superuser must have first_name.")
        if not last_name:
            raise ValueError("The superuser must have last_name.")

        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        super_user = self.create_user(email=email, password=password, user_name=user_name, first_name=first_name, last_name=last_name, **extra_fields)

        super_user.save()
        return super_user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=50, blank=False)
    last_name = models.CharField(max_length=150, blank=False)
    user_name = models.CharField(max_length=150, )
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "user_name"]

    objects = CustomUserManager()

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def __str__(self):
        return self.email

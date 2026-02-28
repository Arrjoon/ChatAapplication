"""
Management command to initialize default groups and permissions
Run: python manage.py init_groups
"""
from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from accounts.models import User


class Command(BaseCommand):
    help = 'Initialize default groups (Chief Editor, Editor, Reporter) with permissions'

    def handle(self, *args, **options):
        # Create groups
        chief_editor_group, created = Group.objects.get_or_create(name='Chief Editor')
        editor_group, created = Group.objects.get_or_create(name='Editor')
        reporter_group, created = Group.objects.get_or_create(name='Reporter')
        
        # Get all permissions
        all_permissions = Permission.objects.all()
        
        # Get account-specific permissions
        account_permissions = Permission.objects.filter(
            content_type__app_label='accounts'
        )
        
        # Chief Editor: All permissions
        chief_editor_group.permissions.set(all_permissions)
        self.stdout.write(
            self.style.SUCCESS(f'✓ Chief Editor group created/updated with {all_permissions.count()} permissions')
        )
        
        # Editor: Can view and edit users, manage posts, but not delete users
        editor_permissions = account_permissions.filter(
            codename__in=['can_view_users', 'can_manage_users']
        )
        # Add post management permissions (when you create them)
        editor_group.permissions.set(editor_permissions)
        self.stdout.write(
            self.style.SUCCESS(f'✓ Editor group created/updated with {editor_permissions.count()} permissions')
        )
        
        # Reporter: Can only view own profile
        reporter_permissions = account_permissions.filter(
            codename='can_view_users'
        )
        reporter_group.permissions.set(reporter_permissions)
        self.stdout.write(
            self.style.SUCCESS(f'✓ Reporter group created/updated with {reporter_permissions.count()} permissions')
        )
        
        self.stdout.write(
            self.style.SUCCESS('\n✓ Default groups initialized successfully!')
        )
        self.stdout.write(
            self.style.WARNING('\nNote: You may need to create custom permissions in your models.')
        )


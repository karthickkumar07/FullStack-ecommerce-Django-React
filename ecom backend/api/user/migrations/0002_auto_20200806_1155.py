# Generated by Django 3.0.8 on 2020-08-06 11:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='Gender',
            new_name='gender',
        ),
    ]

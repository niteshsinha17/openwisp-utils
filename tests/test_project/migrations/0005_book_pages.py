# Generated by Django 3.0.14 on 2021-06-20 06:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('test_project', '0004_auto_20210620_0604'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='pages',
            field=models.PositiveIntegerField(blank=True, null=True, verbose_name='Pages'),
        ),
    ]
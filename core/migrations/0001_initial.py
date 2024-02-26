# Generated by Django 4.2.7 on 2023-12-19 19:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Products',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='اسم المنتج')),
                ('amount', models.IntegerField(verbose_name='الكمية')),
                ('salary', models.FloatField(default=0, verbose_name='سعره')),
            ],
            options={
                'verbose_name': 'منتجات',
                'verbose_name_plural': 'منتجات',
            },
        ),
        migrations.CreateModel(
            name='ProductTypes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='اسم')),
                ('desc', models.TextField(blank=True, null=True, verbose_name='الوصف')),
            ],
            options={
                'verbose_name': 'نوع المنتج',
                'verbose_name_plural': 'نوع المنتج',
            },
        ),
        migrations.CreateModel(
            name='saler',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='اسم البائع')),
                ('phone', models.CharField(blank=True, max_length=255, null=True, verbose_name='رقم الهاتف')),
                ('addr', models.TextField(blank=True, null=True, verbose_name='العنوان')),
            ],
            options={
                'verbose_name': 'البائع',
                'verbose_name_plural': 'البائعون',
            },
        ),
        migrations.CreateModel(
            name='sales',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('how_many', models.FloatField(default=0, verbose_name='الكمية')),
            ],
            options={
                'verbose_name': 'بيعة',
                'verbose_name_plural': 'المبيعات',
            },
        ),
        migrations.CreateModel(
            name='Warehouse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, default='ware house', max_length=255, null=True, verbose_name='اسم المخزن')),
                ('address', models.TextField(blank=True, null=True, verbose_name='عنوانه')),
                ('max_amount', models.IntegerField(blank=True, null=True, verbose_name='أقصي كم')),
            ],
            options={
                'verbose_name': 'المخزن',
                'verbose_name_plural': 'المخزن',
            },
        ),
        migrations.CreateModel(
            name='zabon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='اسم الزبون')),
                ('phone', models.CharField(blank=True, max_length=255, null=True, verbose_name='رقم الهاتف')),
                ('addr', models.TextField(blank=True, null=True, verbose_name='العنوان')),
            ],
            options={
                'verbose_name': 'الزبون',
                'verbose_name_plural': 'الزبائن',
            },
        ),
        migrations.CreateModel(
            name='WarehouseProductRel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('how_many', models.IntegerField(verbose_name='الكمية')),
                ('products', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.products', verbose_name='المنتج')),
                ('warehouse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.warehouse', verbose_name='المخزن')),
            ],
        ),
        migrations.AddField(
            model_name='products',
            name='p_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='core.producttypes', verbose_name='نوع المنتج'),
        ),
    ]

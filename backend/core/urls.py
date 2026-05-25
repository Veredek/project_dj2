from django.urls import path
from .views import *

# make urlpatterns for each json file in the data folder
urlpatterns = [
    path("pizza/", pizza_json, name="pizza_json"),
    path("sales_p_product/", sales_p_product_json, name="sales_p_product_json"),
    path("ponto/", ponto_json, name="ponto_json"),
    path("month_sales/", month_sales_json, name="month_sales_json"),
    path("sales_profit/", sales_profit_json, name="sales_profit_json"),
]
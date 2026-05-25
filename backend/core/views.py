import json
from pathlib import Path
from django.http import JsonResponse


BACKEND_DIR = Path(__file__).resolve().parent.parent


def pizza_json(request):
    file_path = BACKEND_DIR / "data" / "pizza.json"

    with open(file_path, encoding="utf-8") as file:
        data = json.load(file)

    return JsonResponse(data=data)


def sales_p_product_json(request):
    file_path = BACKEND_DIR / "data" / "sales_p_product.json"

    with open(file_path, encoding="utf-8") as file:
        data = json.load(file)

    return JsonResponse(data=data)


def ponto_json(request):
    file_path = BACKEND_DIR / "data" / "ponto.json"

    with open(file_path, encoding="utf-8") as file:
        data = json.load(file)

    return JsonResponse(data=data)


def month_sales_json(request):
    file_path = BACKEND_DIR / "data" / "month_sales.json"

    with open(file_path, encoding="utf-8") as file:
        data = json.load(file)

    return JsonResponse(data=data)


def sales_profit_json(request):
    file_path = BACKEND_DIR / "data" / "sales_profit.json"

    with open(file_path, encoding="utf-8") as file:
        data = json.load(file)

    return JsonResponse(data=data)
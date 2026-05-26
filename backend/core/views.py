import json
from pathlib import Path
from django.http import JsonResponse, Http404


BACKEND_DIR = Path(__file__).resolve().parent.parent


def json_file(request, filename):
    file_path = BACKEND_DIR / "data" / f"{filename}.json"

    if not file_path.exists():
        raise Http404("Arquivo não encontrado")

    with open(file_path, encoding="utf-8") as file:
        data = json.load(file)

    return JsonResponse(data, safe=False)
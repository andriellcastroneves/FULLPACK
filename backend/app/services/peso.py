def calcular_quantidade_por_peso(item: str, quantidade_amostra: int, peso_amostra: float, peso_total: float):
    peso_unitario = peso_amostra / quantidade_amostra
    quantidade_estimada = peso_total / peso_unitario
    quantidade_arredondada = round(quantidade_estimada)

    return {
        "item": item,
        "peso_unitario": round(peso_unitario, 4),
        "quantidade_estimada": round(quantidade_estimada, 2),
        "quantidade_arredondada": quantidade_arredondada,
    }
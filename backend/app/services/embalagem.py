import math

LIMITE_PESO_EMBALAGEM_KG = 40.0


def gerar_rotacoes(item):
    a, b, c = item
    return [
        (a, b, c),
        (a, c, b),
        (b, a, c),
        (b, c, a),
        (c, a, b),
        (c, b, a),
    ]


def calcular_max_itens(item, caixa):
    caixa_altura = caixa.altura
    caixa_largura = caixa.largura
    caixa_comprimento = caixa.comprimento

    max_itens = 0
    melhor_rotacao = None

    for rot in gerar_rotacoes(item):
        a, l, c = rot
        qtd = int(caixa_altura // a) * int(caixa_largura // l) * int(caixa_comprimento // c)

        if qtd > max_itens:
            max_itens = qtd
            melhor_rotacao = rot

    return max_itens, melhor_rotacao


def encontrar_melhor_caixa(item_dim, quantidade, caixas):
    melhor_caixa = None
    melhor_capacidade = 0
    melhor_rotacao = None
    menor_volume = None

    for caixa in caixas:
        capacidade, rotacao = calcular_max_itens(item_dim, caixa)

        if capacidade >= quantidade:
            volume_caixa = caixa.altura * caixa.largura * caixa.comprimento

            if menor_volume is None or volume_caixa < menor_volume:
                menor_volume = volume_caixa
                melhor_caixa = caixa
                melhor_capacidade = capacidade
                melhor_rotacao = rotacao

    return melhor_caixa, melhor_capacidade, melhor_rotacao


def escolher_largura_bolha(altura, largura, comprimento):
    maior_dim = max(altura, largura, comprimento)

    if maior_dim <= 30:
        return "Plástico bolha 30 cm"
    elif maior_dim <= 60:
        return "Plástico bolha 60 cm"
    return "Plástico bolha 1 m"


def dividir_quantidade_por_peso(quantidade, peso_unitario, limite=LIMITE_PESO_EMBALAGEM_KG):
    max_por_volume = max(1, math.floor(limite / peso_unitario))

    volumes = []
    restante = quantidade

    while restante > 0:
        qtd_volume = min(max_por_volume, restante)
        volumes.append(qtd_volume)
        restante -= qtd_volume

    return volumes


def gerar_instrucao_embalagem(produto, quantidade, caixas):
    nome_upper = produto.nome.upper().strip()

    resultado = {
        "produto": produto.nome,
        "quantidade": quantidade,
        "peso_unitario": produto.peso_unitario,
        "peso_total": round(produto.peso_unitario * quantidade, 3),
        "tipo_embalagem": produto.tipo_embalagem,
        "embalagem_principal": None,
        "observacao": None,
        "volumes": [],
    }

    quantidades_por_volume = dividir_quantidade_por_peso(quantidade, produto.peso_unitario)

    for idx, qtd_volume in enumerate(quantidades_por_volume, start=1):
        peso_volume = round(qtd_volume * produto.peso_unitario, 3)

        volume_info = {
            "numero_volume": idx,
            "quantidade": qtd_volume,
            "peso_total": peso_volume,
            "embalagem_principal": None,
            "observacao": None,
        }

        if produto.tipo_embalagem in ["caixa", "blister"]:
            item_dim = (produto.altura, produto.largura, produto.comprimento)
            melhor_caixa, capacidade, rotacao = encontrar_melhor_caixa(
                item_dim=item_dim,
                quantidade=qtd_volume,
                caixas=caixas,
            )

            if melhor_caixa:
                volume_info["embalagem_principal"] = f"Caixa: {melhor_caixa.nome}"
                volume_info["observacao"] = f"Capacidade da caixa: {capacidade} itens"
            else:
                volume_info["embalagem_principal"] = "Nenhuma caixa encontrada"
                volume_info["observacao"] = "Verificar manualmente"

        elif produto.tipo_embalagem in ["saco_feno_palha", "rolo_bolha"]:
            volume_info["embalagem_principal"] = "Filme preto"
            volume_info["observacao"] = "Aplicar 1 volta cobrindo todo o conteúdo"

        elif produto.tipo_embalagem == "rolo_cartonado":
            material = escolher_largura_bolha(produto.altura, produto.largura, produto.comprimento)
            volume_info["embalagem_principal"] = material
            volume_info["observacao"] = "Aplicar 3 voltas"

        elif produto.tipo_embalagem == "tampa":
            volume_info["embalagem_principal"] = "Aguardando item principal em caixa"
            volume_info["observacao"] = "A tampa deve acompanhar um item embalado em caixa"

        elif produto.tipo_embalagem == "caixa_desmontada":
            material = escolher_largura_bolha(produto.altura, produto.largura, produto.comprimento)
            volume_info["embalagem_principal"] = material
            volume_info["observacao"] = "Enrolar em plástico bolha"

        else:
            volume_info["embalagem_principal"] = "Tipo não mapeado"
            volume_info["observacao"] = "Verificar cadastro do produto"

        if nome_upper.startswith("VD"):
            complemento = "Aplicar reforço com plástico bolha após embalagem"
            volume_info["observacao"] = f"{volume_info['observacao']} | {complemento}"

        resultado["volumes"].append(volume_info)

    if len(resultado["volumes"]) == 1:
        resultado["embalagem_principal"] = resultado["volumes"][0]["embalagem_principal"]
        resultado["observacao"] = resultado["volumes"][0]["observacao"]
    else:
        resultado["embalagem_principal"] = f"{len(resultado['volumes'])} volumes"
        resultado["observacao"] = f"Pedido dividido por peso máximo de {LIMITE_PESO_EMBALAGEM_KG} kg"

    return resultado


def ajustar_tampas_no_pedido(resultados):
    item_principal_em_caixa = None

    for resultado in resultados:
        if resultado["tipo_embalagem"] in ["caixa", "blister"]:
            for volume in resultado["volumes"]:
                if volume["embalagem_principal"].startswith("Caixa:"):
                    item_principal_em_caixa = resultado["produto"]
                    break
        if item_principal_em_caixa:
            break

    for resultado in resultados:
        if resultado["tipo_embalagem"] == "tampa":
            if item_principal_em_caixa:
                resultado["embalagem_principal"] = "Incluir junto na caixa"
                resultado["observacao"] = f"Acompanhar item principal: {item_principal_em_caixa}"

                for volume in resultado["volumes"]:
                    volume["embalagem_principal"] = "Incluir junto na caixa"
                    volume["observacao"] = f"Acompanhar item principal: {item_principal_em_caixa}"
            else:
                resultado["embalagem_principal"] = "Verificar manualmente"
                resultado["observacao"] = "Não há item principal embalado em caixa neste pedido"

                for volume in resultado["volumes"]:
                    volume["embalagem_principal"] = "Verificar manualmente"
                    volume["observacao"] = "Não há item principal embalado em caixa neste pedido"

    return resultados


def consolidar_embalagem(resultados):
    resumo = {
        "caixas": {},
        "filme_preto": 0,
        "plastico_bolha": {},
        "outros": []
    }

    for r in resultados:
        for volume in r["volumes"]:
            emb = volume["embalagem_principal"] or ""

            if emb.startswith("Caixa:"):
                nome_caixa = emb.replace("Caixa:", "").strip()
                resumo["caixas"][nome_caixa] = resumo["caixas"].get(nome_caixa, 0) + 1
            elif "Filme preto" in emb:
                resumo["filme_preto"] += 1
            elif "Plástico bolha" in emb:
                resumo["plastico_bolha"][emb] = resumo["plastico_bolha"].get(emb, 0) + 1
            elif "Incluir junto na caixa" in emb:
                continue
            else:
                resumo["outros"].append(r["produto"])

    return resumo
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function buscarPais(nomePais) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = "Carregando...";
        try {
            const resposta = yield fetch(`https://restcountries.com/v3.1/name/${nomePais}?fullText=true`);
            if (!resposta.ok) {
                throw new Error("ERRO: PAÍS NÃO ENCONTRADO.");
            }
            const dados = yield resposta.json();
            const pais = dados[0];
            resultadoDiv.innerHTML = `
            <h2>${pais.name.common}</h2>
            <p><strong> Capital: </strong> ${((_a = pais.capital) === null || _a === void 0 ? void 0 : _a[0]) || "N/A"} </p>
            <p><strong> População: </strong> ${pais.population.toLocaleString()} </p>
            <img src="${pais.flags.png}" alt="Bandeira de ${pais.name.common}">        
        `;
        }
        catch (erro) {
            resultadoDiv.innerHTML = `<p style="color:red;"> ${erro.message} </p>`;
        }
    });
}
const btn = document.getElementById("buscarBtn");
const input = document.getElementById("paisInput");
btn.addEventListener("click", () => {
    const nomePais = input.value.trim();
    if (nomePais) {
        buscarPais(nomePais);
    }
    else {
        alert("DIGITE O NOME DE UM PAÍS.");
    }
});

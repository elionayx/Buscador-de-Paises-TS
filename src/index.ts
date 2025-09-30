interface Pais {
    name: {common: string};
    capital: string[];
    population: number;
    flags: {png: string};
}

async function buscarPais (nomePais: string): Promise<void> {
    const resultadoDiv = document.getElementById("resultado") as HTMLDivElement;
    resultadoDiv.innerHTML = "Carregando...";

    try {
        const resposta = await fetch (`https://restcountries.com/v3.1/name/${nomePais}?fullText=true`);
        if (!resposta.ok) {
            throw new Error ("ERRO: PAÍS NÃO ENCONTRADO.");
        }

        const dados: Pais[] = await resposta.json();
        const pais = dados[0];

        resultadoDiv.innerHTML = `
            <h2>${pais.name.common}</h2>
            <p><strong> Capital: </strong> ${pais.capital?.[0] || "N/A"} </p>
            <p><strong> População: </strong> ${pais.population.toLocaleString()} </p>
            <img src="${pais.flags.png}" alt="Bandeira de ${pais.name.common}">        
        `;

    } catch (erro) {
        resultadoDiv.innerHTML = `<p style="color:red;"> ${(erro as Error).message} </p>`;
    }
}

const btn = document.getElementById("buscarBtn") as HTMLButtonElement;
const input = document.getElementById("paisInput") as HTMLInputElement;

btn.addEventListener("click", () => {
    const nomePais = input.value.trim();
    if (nomePais) {
        buscarPais (nomePais);
    } else {
        alert("DIGITE O NOME DE UM PAÍS.");
    }
});

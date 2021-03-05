function showInfo(response) {
    console.log(response);
    document.querySelector("#region").innerHTML = ` Region: ${response[0].region}`;
    document.querySelector("#country").innerHTML = response[0].name;
    document.querySelector("#subregion").innerHTML = response[0].subregion;
    document.querySelector("#capital").innerHTML = response[0].capital;
    let limit = document.querySelector("#limitations");
    let data = response[0].borders;
    if (data.length > 0) {
        let title = document.createElement("p");
        title.appendChild(document.createTextNode("Borders:"));
        limit.append(title);
        let border = data.map(limits => {
            fetch(`https://restcountries.eu/rest/v2/alpha/${limits}`,{
                method: 'GET'
            }).then(response => response.json())
            .then((country) => {
                let countryName = country.name;
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(countryName));
                limit.append(li);
            })
        });
    } else {
        limit.innerHTML = "No borders";
    }

    document.querySelector("#language").innerHTML = response[0].languages[0].name;
    let min = response[0].alpha3Code.toLowerCase();
    document.querySelector("#flag").setAttribute("src", `https://restcountries.eu/data/${min}.svg`);
    document.querySelector("#flag").setAttribute("alt", response[0].name);
    document.querySelector("#currency-name").innerHTML = response[0].currencies[0].name;
    document.querySelector("#currency-symbol").innerHTML = response[0].currencies[0].symbol;
}

function searchCountry(country) {
    let apiUrl = `https://restcountries.eu/rest/v2/name/${country}`;
    fetch(apiUrl,{
        method: 'GET'
    }).then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        showInfo(myJson);
    });

}

function search(event) {
    event.preventDefault();
    let country = document.querySelector("#search-country").value;
    let limit = document.querySelector("#limitations");
    limit.innerHTML = null;
    searchCountry(country);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
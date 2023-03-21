$.ajax({
    url: "https://valorant-api.com/v1/weapons"
}).done((result) => {
    let text = "";
    $.each(result.data, function (key, val) {
        text += `<tr>
                    <td>${key + 1}</td>
                    <td>${val.displayName}</td>
                    <td><button class="btn btn-primary" onclick="detail('https://valorant-api.com/v1/weapons/',${key})" data-bs-toggle="modal" data-bs-target="#modalValo">Detail</button></td>
                </tr>`;
    })
    $("#tbodyValo").html(text)
});

function detail(stringUrl, key) {
    $.ajax({
        url: stringUrl
    }).done((result) => {
        let text = "";
        const name = result.data[key].displayName;
        const img = result.data[key].displayIcon;
        let cost = "";
        let category = "";
        if (result.data[key].shopData == null) {
            cost = "-";
            category = name;
        } else {
            cost = result.data[key].shopData.cost;
            category = result.data[key].shopData.category;
        }
        text += `
                <h1#exampleModalLabel>${name}</h1>
                <img src="${img}" class="card-img-top p-3">
                <p>Cost: ${cost}</p>
                <p>Category: ${category}</p>
                `;
        $(".modal-body").html(text)
    });
}
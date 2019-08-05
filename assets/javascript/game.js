let myData = ["Jetstream SC250", "Aspid Ifr", "McLaren", "Porshe", "Audi R8", "Ferrari F50 Spider", "Maserati Alfieri", "TVR Chimaera", "LamborghinI", "Koenigsegg Jesko", "GTA Spano", "Buggati Chiron", "Ariel Atom"];

$(document).ready(function() {
    renderButton();
    function renderButton() {
        $("#allbuttons").empty();

        for (let i=0 ; i < myData.length; i++) {

            let newButton = $("<button>");
            newButton.addClass("itembutton");
            newButton.addClass("btn btn-success");
            newButton.text(myData[i]);
            newButton.attr("data-name", myData[i]);
            $("#allbuttons").append(newButton);

        }

    }



    $("#addbutton").on("click",  function(event) {
        
        event.preventDefault();
        let addedData = $("#userinput").val().trim();
        if (addedData != "") {
            myData.push(addedData);
            renderButton();
            $("#userinput").val(" ");
        }



    });  

    $(document).on("click", ".itembutton", displayInfo);


    function displayInfo() {
        let itemName = $(this).attr("data-name");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=cars+" + itemName + "&rating=g&limit=15&api_key=1mqaRI16fveNQPuJoJIyqm6x304W02s3";
        $("#mainimages").empty();

        $.ajax ({
            url: queryURL,
            method: "GET"
        }) .then(function(response) {
            console.log(response);

            let results = response.data;

            for (let i=0; i<results.length; i++) {

                let dataImage = $("<img>");
                dataImage.attr("src", results[i].images.fixed_height_still.url);
                dataImage.attr("data-still", results[i].images.fixed_height_still.url);
                dataImage.attr("data-animate", results[i].images.fixed_height.url);
                dataImage.addClass("gif");
                dataImage.attr("data-state", "still");
    
    
                let newItemdiv = $('<div class="newItem">');
                let gifRating = results[i].rating;
                let divRating = $("<p>").text("Rating: " + gifRating);
                
                newItemdiv.append(divRating);
                newItemdiv.append(dataImage);
    
                $("#mainimages").prepend(newItemdiv);



            }
    
 
        }); 


    }


    $("#mainimages").on("click", ".gif", function() {
        let state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }


        else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });


})
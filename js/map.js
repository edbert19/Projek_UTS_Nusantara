var petaObj = document.getElementById("petaIndonesia");

petaObj.addEventListener("load", function() {
    var svgDoc = petaObj.contentDocument;
    var provinsi = svgDoc.querySelectorAll("path");

    for (var i = 0; i < provinsi.length; i++) {
        var p = provinsi[i];

        p.style.fill = "#713500ff";    
        p.style.stroke = "#291300ff";
        p.style.cursor = "pointer";
        p.style.pointerEvents = "auto";

        p.addEventListener("click", function() {
            var provinsiName = this.getAttribute("title");
            if (provinsiName) {
                window.location.href = "search.html?prov=" + encodeURIComponent(provinsiName);
            } else {
                alert("Nama provinsi tidak ditemukan!");
            }
        });

        p.addEventListener("mouseover", function() {
            this.style.fill = "#291300ff";
        });

        p.addEventListener("mouseout", function() {
            this.style.fill = "#713500ff"; 
        });
    }
});

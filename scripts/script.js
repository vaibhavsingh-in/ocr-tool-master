var droparea = document.querySelector('#input');
var dropText = document.querySelector('#dragText');
var conversionWindow = new bootstrap.Modal(document.getElementById('exampleModal'), focus)
var modalBody = document.querySelector('.modal-body')
var extractedText = "";
var dropareaPrimaryText = document.querySelector('#primary-text');
var dropareaSecondaryText = document.querySelector('#secondary-text');
let browseBtn = document.querySelector(".browseBtn");
let downloadBtn = document.querySelector(".downloadBtn");
let browseInput = document.querySelector("input")
let virtualClipboard = document.querySelector("#virtual-clipboard");


// To Copy the Content
let copybtn = document.querySelector("#copyBtn");

copybtn.addEventListener("click", function (event) {

    copied();

    let virtualClipboard = document.querySelector(".modal-body");
    virtualClipboard.focus();
    virtualClipboard.select();
    document.execCommand("copy");
    copied();
});

// To Download

downloadBtn.addEventListener("click",()=>{
    const blob=new Blob([modalBody.value],{type:"text/plain"});
    const fileUrl = URL.createObjectURL(blob);
    const link=document.createElement("a");
    link.download="output-Text";
    link.href=fileUrl;
    link.click();
})

// On Browse

browseBtn.onclick = () => {
    browseInput.click();

}
// When Browse a File
browseInput.addEventListener('change', function () {
    file = this.files[0];
    checkFile(file);
    onDropStyles();

})
// When file is inside the drag area

droparea.addEventListener("dragover", (event) => {
    event.preventDefault();
    droparea.style.transition = "0.5s";
    droparea.classList.add("main-input-hover");
    dropText.textContent = 'Release to Upload';

});

// When file leaves the drag area

droparea.addEventListener("dragleave", (event) => {
    event.preventDefault();
    droparea.style.transition = "0.5s";
    droparea.classList.remove("main-input-hover")
    dropText.textContent = 'Drag & Drop';

});

// When file is droped in drag area

droparea.addEventListener("drop", (event) => {
    event.preventDefault();
    onDropStyles();
    file = event.dataTransfer.files[0];
    checkFile(file)

});
function checkFile(thisFile) {
    let fileType = thisFile.type;
    let validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
console.log(fileType);


    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;

            // Calling function to extract the text
            extractText(fileURL)

        };
        fileReader.readAsDataURL(thisFile);


    }

    else {
        window.alert('This file is not an image, Please Try some other file.');

        oninvalidStyles();

    }
}
function extractText(imgLocation) {

    Tesseract.recognize(
        imgLocation,
        'eng',
        { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {

        extractedText = text;
        openConversionWindow(extractedText);

        console.log(extractedText);
    })
}

function openConversionWindow(element) {
    if (element.length > 0) {
        modalBody.value = element;
        conversionWindow.toggle();
        dropareaPrimaryText.style.display = 'flex';
        dropareaSecondaryText.style.display = 'none';
    }
    else (openConversionWindow());
}
function onDropStyles() {
    droparea.classList.remove("main-input-hover");
    dropText.textContent = 'Drag & Drop';

    dropareaPrimaryText.style.display = 'none';
    dropareaSecondaryText.style.display = 'flex';
}
function oninvalidStyles() {
    droparea.classList.add("main-input-invalid");
    dropareaPrimaryText.style.display = 'flex';
    dropareaSecondaryText.style.display = 'none';
    setInterval(() => {
        droparea.classList.remove("main-input-hover");
        droparea.classList.remove("main-input-invalid");
        
    }, 1000);

    dropText.textContent = 'Drag & Drop';

   
}

function copied() {
    let copybtn = document.querySelector('.copybox');
    copybtn.style.transition = '1s';
    copybtn.style.opacity = 1;


    setInterval(() => {
        copybtn.style.opacity = 0;
    }, 2500);

}

console.log("Blogless v.0.0.0.0.1")

//Common functions
function getcontent(path) {
    fetch(path)
        .then(res => res.text())
        .then(text => {
            console.log(text)
        })
}

function getdocument(document) {
    fetch(document)
        .then(res => res.text())
        .then(text => {
            //Search for metadata
            metadata = text.match(/^<!--.*!-->$/gm)[0]
            metadata = metadata.replace("<!--", "")
            metadata = metadata.replace("!-->", "")
            metadata = JSON.parse(metadata)
            console.log(metadata)
        })
}

//Load configuration
function load_configuration() {
    fetch("/configuration.json")
        .then(res => res.text())
        .then(text => {
            configuration = JSON.parse(text)
            //Get content categories
            apply_configuration(configuration)
        })

}

//Apply configuration
function apply_configuration(configuration) {
    if (configuration) {
        //Set title for document
        document.title = configuration.title
        //Set title for any title occurence
        document.querySelectorAll(".blogless_title").forEach((title) => {
            title.innerHTML=configuration.title
        })
    } else {
        load_configuration()
    }
}

//Initialize markdown converter
var converter = new showdown.Converter()
var render = ""
bl_path = location.toString()
//Check path and set render content
if (bl_path.split('?').length > 1) {
    render = "content" + bl_path.split('?')[1] + '.md'
} else {
    render = "content/pages/home.md"
}
//Render content
if (render != "") {
    fetch(render)
        .then(res => res.text())
        .then(text => {
            document.getElementById("document").innerHTML = converter.makeHtml(text)
            apply_configuration()
        })
}
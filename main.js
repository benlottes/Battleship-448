

document.addEventListener("DOMContentLoaded", () => { 
	canvas = document.querySelector("#myCanvas")
	windowBuilder = new BuildWindow(canvas, canvas.getContext('2d'));
	console.log("Canvas and Context Loaded");
})
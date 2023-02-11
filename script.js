let counter = 0;
let arenaImg;
let contents;
let page = 0;

fetch("https://api.are.na/v2/channels/pollen-brand?per=20")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    contents = data.contents;
    shuffle(contents);

    arenaImg = document.getElementById("arenaImg");
    arenaImg.src = contents[counter].image.square.url;

    let arenaBox = document.getElementById("arena");
    arenaBox.classList.add("fadeIn");

    // kick off loop of updating images
    setTimeout(loop, 500);

    // get the rest of the arena contents
    addToContents();
  });

function addToContents() {
  page++;
  fetch("https://api.are.na/v2/channels/pollen-brand?per=100&page=" + page)
    .then((response) => response.json())
    .then((data) => {
      contents = [...contents, ...data.contents];
      shuffle(contents);
      console.log(contents);
      // continue fetching if all pages checked
      if (data.length > page * 100) {
        addToContents();
      }
    });
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function loop() {
  // fade out image
  setTimeout(function () {
    console.log("adding fade out");
    arenaImg.classList.add("fadeOut");
    arenaImg.classList.remove("fadeIn");
    counter++;
  }, 4000);
  // let new image load
  setTimeout(function () {
    arenaImg.src = contents[counter].image.square.url;
  }, 7000);
  // fade in new image
  setTimeout(function () {
    arenaImg.classList.add("fadeIn");
    arenaImg.classList.remove("fadeOut");
    loop(); // restart the loop
  }, 9000);
}

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then(json => displayLessons(json.data));
};



const removeActive = () => {

    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => btn.classList.remove("active"));
};


const loadLevelWord = (id) => {
    const url = (`https://openapi.programming-hero.com/api/level/${id}`)
    fetch(url)
        .then(res => res.json())
        .then(data => {

            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`)

            clickBtn.classList.add("active");
            displayLevelWord(data.data)
        })
}


const loadWordDetail = async (id) => {
    const url = (`https://openapi.programming-hero.com/api/word/${id}`)
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);

}

const displayWordDetails = (word) => {

    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
                    <div>
                        <h2 class="text-2xl font-bold"">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
                    </div>
                    <div>
                        <h2 class="font-bold">Meaning</h2>
                        <p>${word.meaning}</p>
                    </div>
                    <div>
                        <h2 class="font-bold">Example</h2>
                        <p>${word.sentence}</p>
                    </div>
                    <div>
                        <h2 class="font-bold">Synonym</h2>
                        <span class=" btn">Syn1</span>
                        <span class=" btn">Syn2</span>
                        <span class=" btn">Syn3</span>
                    </div>

    `;

    document.getElementById("word_modal").showModal();

};

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container")
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `

        <div class="text-center col-span-full rounded-xl py-10 space-y-5 font-bangla">
            <img class="mx-auto" src="./assets/alert-error.png" />
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="font-bold  text-4xl">নেক্সট Lesson এ যান</h1>
        </div>
        `;
        return;
    }
    for (let word of words) {
        const card = document.createElement("div")
        card.innerHTML = `

        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-3">
            <h1 class="font-bold text-xl">${word.word ? word.word : "No Word available"}</h1>
            <p class="font-semibold">Meaning/Pronunciation</p>
            <div class="font-bangla font-medium text-xl">${word.meaning ? word.meaning : "No meaning Available"}/${word.pronunciation ? word.pronunciation : "No pronunciation find"}</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF60]"><i class="fa-solid fa-circle-info"></i></button>   
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF60]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;

        wordContainer.append(card)
    }

}

const displayLessons = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");

        btnDiv.innerHTML = `

        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>
        
        `;

        levelContainer.append(btnDiv);
    }

};

loadLessons();
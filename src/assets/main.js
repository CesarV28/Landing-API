import { API_KEY } from "../../env";

const API = 'https://youtube-music1.p.rapidapi.com/v2/search?query=Autumn%20Kings'
let songsData = [];
let totalSongs = 0;

const content = null || document.getElementById('content');
const nextButton = document.getElementById('nextButton');
const returnButton = document.getElementById('returnButton');

const div = document.createElement('div');
div.classList += 'flex items-center justify-center';

const loadingMsg = document.createElement('p');
loadingMsg.className += 'block text-indigo-900 text-center text-3xl';
loadingMsg.textContent = 'Loading songs...';

div.appendChild(loadingMsg);

let start = 0
let limit = 4


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': API_KEY,
		'X-RapidAPI-Host': API_HOST 
	}
};


async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}


const getSongs = async( ) => {
    try {
        const songs = await fetchData(API);
        songsData = songs;
        totalSongs = Math.ceil(songs.result.songs.length);

        let view = 
        `
            ${songs.result.songs.map(song => `
                <div class="group">
                    <div
                        class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${song.thumbnail}" alt="Image_${song.name}" class="w-full">
                        </div>
                        <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${song.name}
                        </h3>
                    </div>
                    <a class="z-10" href="https://www.youtube.com/watch?v=${song.id}" target="_blank">Listen song</a>
                </div>
            `).slice(start, limit).join('')}
        `;

        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
}


(() => {
    content.appendChild(div);
    getSongs();
})()


const nextSongs = () => {
    if( totalSongs <= limit ) return;
    start = start + 4;
    limit = limit + 4
    content.innerHTML = '';
    content.appendChild(div);
    getSongs();
    
} 

const returntSongs = () => {
    if( limit === 4 ) return;
    start = start - 4;
    limit = limit - 4
    content.innerHTML = '';
    content.appendChild(div);
    getSongs();
} 

nextButton.addEventListener('click', nextSongs)
returnButton.addEventListener('click', returntSongs)
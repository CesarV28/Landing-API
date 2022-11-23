const API = 'https://youtube-music1.p.rapidapi.com/v2/search?query=Autumn%20Kings'

const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '43531c2af2msh6cf3a57cbc17048p1f2defjsn1158ffeee29b',
		'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
	}
};


async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}


( async() => {
    try {
        const songs = await fetchData(API);
        let view = 
        `
            ${songs.result.songs.map(song => `
                <div class="group relative">
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
                </div>
            `).slice(0, 4).join('')}
            
        `;

        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})()
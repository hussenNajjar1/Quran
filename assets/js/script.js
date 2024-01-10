const apiUrl = "https://mp3quran.net/api/v3";
const reciters = "reciters";
const language = "ar";

async function getRecitres() {
  const chooseReciter = document.querySelector("#chooseReciter");
  const res = await fetch(`${apiUrl}/reciters?language=${language}`);
  const data = await res.json();
  chooseReciter.innerHTML = `<option value="">اختر قارئ</option>`;

  data.reciters.forEach(
    (re) =>
      (chooseReciter.innerHTML += `<option value="${re.id}">${re.name}</option>`)
  );
  // عند تغير القارئ تفير البيانات
  chooseReciter.addEventListener("change", (e) => getMOshaf(e.target.value));
}
getRecitres();
async function getMOshaf(reciter) {
  const chooseMoshaf = document.querySelector("#chooseMoshaf");
  const res = await fetch(
    `${apiUrl}/reciters?language=${language}&reciter=${reciter}`
  );
  const data = await res.json();
  const moshaf = data.reciters[0].moshaf;
  chooseMoshaf.innerHTML = `<option value="" >اختر مصحف</option>`;

  moshaf.forEach((re) => {
    chooseMoshaf.innerHTML += `<option value="${re.id}" data-server="${re.server}" data-surahList="${re.surah_list}" >${re.name}</option>`;
  });
  chooseMoshaf.addEventListener("change", (e) => {
    const selectedMoshaf = chooseMoshaf.options[chooseMoshaf.selectedIndex];
    const surahserver = selectedMoshaf.dataset.server;
    const surahlist = selectedMoshaf.dataset.surahlist;
    getSurah(surahserver, surahlist);
  });
}

async function getSurah(surahserver, surahlist) {
  console.log(surahserver);

  const choosesurah = document.querySelector("#choosesurah");
  const res = await fetch(" https://mp3quran.net/api/v3/suwar");
  const data = await res.json();
  const surahName = data.suwar;

  surahlist = surahlist.split(",");
  choosesurah.innerHTML = `<option value="" >اختر سورة</option>`;
  surahlist.forEach((surah) => {
    const padSurah = surah.padStart(3, "0");
    surahName.forEach((surahName) => {
      if (surahName.id == surah) {
        choosesurah.innerHTML += `<option value="${surahserver}${padSurah}.mp3" >${surahName.name}</option>`;
      }
    });
  });

  choosesurah.addEventListener("change", (e) => {
    const selectedsurah = choosesurah.options[choosesurah.selectedIndex];
    Playsurah(selectedsurah.value)
  })
}

function Playsurah(surahmp3)
{
    const audioPlayar = document.querySelector("#audioPlayar");
    audioPlayar.src=surahmp3;
    audioPlayar.play();
}


function playlive(channel)
{
    if(Hls.isSupported()) {
        var video = document.getElementById('videolive');
        var hls = new Hls();
        hls.loadSource(`${channel}`);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
          video.play();
      });
     }
}
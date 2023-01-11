const allData = [];
const RENDER_EVENT = 'render-data';
const DATA_KEY = 'DATA_USER';
const CASH_STORAGE = 'CASH_USER';
const INCASH_STORAGE = 'INCASH_USER';
const OUTCASH_STORAGE = 'OUTCASH_USER';

let thisPeriod;
let cash;
let inCash;
let outCash;

setInterval(function () {
    let dateBox = document.getElementById('date');
    dateBox.textContent = dateInString();
}, 86400000);

setInterval(function () {
    let clockBox = document.getElementById('time');
    clockBox.textContent = timeInString();
}, 1000);

window.addEventListener('scroll', function () {
    const btnShowForm = document.getElementById("showForm");
    console.log("width " + window.innerWidth);

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio > 0.5) {
                if (window.innerWidth <= 768)
                    btnShowForm.setAttribute('style', 'opacity: 1; z-index: 9;');
            } else {
                btnShowForm.removeAttribute('style');
            }
        });
    });
    const element = document.querySelector('footer');
    observer.observe(element);
    const topSlctr = document.querySelector('body');
    const observer1 = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            console.log(entry.boundingClientRect.top);
            if (entry.boundingClientRect.top < 110) {
                topSlctr.classList.add('onscroll');
            } else {
                topSlctr.classList.remove('onscroll');
            }
        });
    });
    const element1 = document.getElementById('inputData');
    observer1.observe(element1);
});

window.addEventListener("load", function () {
    const dateDisplay = document.getElementById('tittleList');
    let currentDate = new Date();
    dateDisplay.textContent = getPeriod(currentDate);


    if (isStorageExist()) {
        loadDataFromStorage();
    }

    document.getElementById('tanggal').value = (new Date().toISOString()).split("T")[0];

    document.getElementById('date').textContent = dateInString();
    document.getElementById('time').textContent = timeInString();

    document.getElementById('in').addEventListener('focus', function () {
        document.querySelector('label[for="deskripsi"]').innerText = "catatan:";
    });

    document.getElementById('out').addEventListener('focus', function () {
        document.querySelector('label[for="deskripsi"]').innerText = "keperluan:";
    });

    document.getElementById("btnPrev").addEventListener("click", function () {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate
            .getDate());
        dateDisplay.textContent = getPeriod(currentDate);
        document.dispatchEvent(new Event(RENDER_EVENT));
    });

    document.getElementById("btnNext").addEventListener("click", function () {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate
            .getDate());
        dateDisplay.textContent = getPeriod(currentDate);;
        document.dispatchEvent(new Event(RENDER_EVENT));
    });

    document.getElementById('inputData').addEventListener('submit', function (event) {
        event.preventDefault();
        addData();
        document.getElementById('tanggal').value = (new Date().toISOString()).split("T")[0];
        document.getElementById('desc').value = '';
        document.getElementById('cashInput').value = '';
        alertbox('Input anda berhasil ditambahkan');
    });

    document.getElementById('showForm').addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });

    document.getElementById('resetData').addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        alertbox(
            'Apakah anda yakin ingin menghapus data?<br> data yang sudah dihapus tidak bisa dikembalikan!!',
            function (answer) {
                if (answer) {
                    localStorage.clear();
                    alertbox('Data berhasil dihapus!!');
                }
            });
    });

    function getPeriod(date) {
        let period = monthString(date) + " " + date.getFullYear();
        return period;
    }
});

document.addEventListener(RENDER_EVENT, function () {
    const listDataUser = document.getElementById('listData');

    listDataUser.innerHTML = '';

    document.getElementById('headerUang').innerHTML = "<span>Sisa Uang Anda: </span>" + formatCurrency(
        cash);
    document.getElementById('recapIn').innerHTML = "<span>uang masuk: </span>" + formatCurrency(inCash);
    document.getElementById('recapOut').innerHTML = "<span>uang keluar: </span>" + formatCurrency(outCash);

    function tableHead() {
        const outerDefault = document.createElement('tr');
        outerDefault.classList.add("headOfTable");
        const headTgl = document.createElement('th');
        headTgl.innerText = "Tgl";
        const headDesc = document.createElement('th');
        headDesc.innerText = "Keterangan";
        const headMsk = document.createElement('th');
        headMsk.innerText = "Masuk";
        const headKlr = document.createElement('th');
        headKlr.innerText = "Keluar";

        outerDefault.append(headTgl, headDesc, headMsk, headKlr);

        return outerDefault;
    }

    document.getElementById("listData").append(tableHead());

    const period = document.getElementById('tittleList').innerText;
    let thisMonth = filterByPeriode(allData, period);

    if (thisMonth != null) {
        for (const dataItem of thisMonth) {
            const dataElement = showData(dataItem);
            listDataUser.append(dataElement);
        }
        if (thisMonth.length < 12) {
            let count = 15 - thisMonth.length;
            for (let c = 0; c < count; c++) {
                const baris = document.createElement('tr');
                for (let i = 0; i < 4; i++) {
                    const kolom = document.createElement('td');
                    kolom.textContent = "#";
                    kolom.style.color = "transparent";
                    baris.append(kolom);
                }
                listDataUser.appendChild(baris);
            }
        }
    }
});

function dayString(date) {
    if (date.getDay() == 0)
        return "Minggu";
    else if (date.getDay() == 1)
        return "Senin";
    else if (date.getDay() == 2)
        return "Selasa";
    else if (date.getDay() == 3)
        return "Rabu";
    else if (date.getDay() == 4)
        return "Kamis";
    else if (date.getDay() == 5)
        return "Jum'at";
    else
        return "Sabtu";
}

function monthString(date) {
    if (date.getMonth() == 0)
        return "Januari";
    else if (date.getMonth() == 1)
        return "Februari";
    else if (date.getMonth() == 2)
        return "Maret";
    else if (date.getMonth() == 3)
        return "April";
    else if (date.getMonth() == 4)
        return "Mei";
    else if (date.getMonth() == 5)
        return "Juni";
    else if (date.getMonth() == 6)
        return "Juli";
    else if (date.getMonth() == 7)
        return "Agustus";
    else if (date.getMonth() == 8)
        return "September";
    else if (date.getMonth() == 9)
        return "Oktober";
    else if (date.getMonth() == 10)
        return "November";
    else
        return "Desember";
}

function timeInString() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (now.getMinutes() < 10)
        minutes = "0" + now.getMinutes();

    let timeString = hours + ':' + minutes;
    return timeString;
}

function dateInString() {
    let now = new Date();
    let day = dayString(now);
    let date = now.getDate();
    let month = monthString(now);
    let year = now.getFullYear();

    dateString = day + ", " + date + " " + month + " " + year;
    return dateString;
}

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alertbox('Browser Anda tidak mendukung local storage');
        return false;
    }
    return true;
}

function saveData() {
    if (isStorageExist()) {
        const dataParsed = JSON.stringify(allData);

        localStorage.setItem(DATA_KEY, dataParsed);
        localStorage.setItem(CASH_STORAGE, cash);
        localStorage.setItem(INCASH_STORAGE, inCash);
        localStorage.setItem(OUTCASH_STORAGE, outCash);
    }
}

function loadDataFromStorage() {
    const dataFromStorage = localStorage.getItem(DATA_KEY);
    let list = JSON.parse(dataFromStorage);

    if (list !== null) {
        for (const data of list) {
            allData.push(data);
        }
    }

    cash = JSON.parse(localStorage.getItem(CASH_STORAGE));
    inCash = JSON.parse(localStorage.getItem(INCASH_STORAGE));
    outCash = JSON.parse(localStorage.getItem(OUTCASH_STORAGE));

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function formatCurrency(amount) {
    let result;

    var formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    });

    if (amount == null)
        result = formatter.format(0);
    else
        result = formatter.format(amount);
    return result;
}

function generateData(tanggal, periode, deskripsi, cashIn, cashOut) {
    return {
        tanggal,
        periode,
        deskripsi,
        cashIn,
        cashOut
    }
}

function filterByPeriode(array, period) {
    return array.filter(item => item.periode == period);
}

function showData(dataObject) {
    const OuterTable = document.createElement('tr');
    const contentDate = document.createElement('td');
    contentDate.innerText = dataObject.tanggal;

    const contentDeskripsi = document.createElement('td');
    contentDeskripsi.innerText = dataObject.deskripsi;

    const contentCashIn = document.createElement('td');
    if (dataObject.cashIn === 0)
        contentCashIn.innerText = "-";
    else
        contentCashIn.innerText = dataObject.cashIn;

    const contentCashOut = document.createElement('td');
    if (dataObject.cashOut === 0)
        contentCashOut.innerText = "-";
    else
        contentCashOut.innerText = dataObject.cashOut;

    OuterTable.append(contentDate, contentDeskripsi, contentCashIn, contentCashOut);

    return OuterTable;
}

function addData() {
    const inputDate = new Date(document.getElementById('tanggal').value);
    const tgl = inputDate.getDate();
    const periode = monthString(inputDate) + " " + inputDate.getFullYear();
    const deskripsi = document.getElementById('desc').value;
    const checkArea = document.getElementById('in');
    let inputIn;
    let inputOut;
    let updateCash;

    if (checkArea.checked) {
        inputIn = document.getElementById('cashInput').value;
        inputOut = 0;
        cash = (+cash) + (+inputIn);
        inCash = (+inCash) + (+inputIn);
    } else {
        inputOut = document.getElementById('cashInput').value;
        inputIn = 0;
        cash = (+cash) - (+inputOut);
        outCash = (+outCash) + (+inputOut);
    }

    const dataObject = generateData(tgl, periode, deskripsi, inputIn, inputOut);
    allData.push(dataObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function alertbox(message, callback) {
    var timeOutPopup;

    const bodyOfPopUp = document.querySelector('.body_popup');
    const gettingAnswer = document.querySelector('.getAnswer');

    document.getElementById('close').addEventListener('click', function () {
        clearTimeout(timeOutPopup);
        closePopup();
    });

    bodyOfPopUp.innerHTML = "<p>" + message + "</p>";

    if (containsQuestionMark(message)) {
        gettingAnswer.innerHTML = '';
        const btnYes = document.createElement('button');
        btnYes.setAttribute('id', 'yes');
        btnYes.classList.add('btn_yes');
        btnYes.innerText = 'yes';
        const btnNo = document.createElement('button');
        btnNo.setAttribute('id', 'no');
        btnNo.classList.add('btn_no');
        btnNo.innerText = 'no';

        gettingAnswer.append(btnYes, btnNo);

        document.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                btnYes.click();
            }
        });
        document.getElementById('yes').addEventListener('click', function () {
            clearTimeout(timeOutPopup);
            closePopup();
            callback(true);
        });
        document.getElementById('no').addEventListener('click', function () {
            clearTimeout(timeOutPopup);
            closePopup();
            callback(false);
        });
    } else {
        gettingAnswer.innerHTML = '';
        const btnOK = document.createElement('button');
        btnOK.setAttribute('id', 'ok');
        btnOK.classList.add('btn_ok');
        btnOK.innerText = 'ok';

        gettingAnswer.append(btnOK);

        document.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                btnOK.click();
            }
        });
        document.getElementById('ok').addEventListener('click', function () {
            clearTimeout(timeOutPopup);
            clearTimeout(reloadEvent);
            closePopup();
            location.reload();
        });
        reloadEvent = setTimeout(function () {
            location.reload();
        }, 5000);
    }

    document.querySelector('.popupblur').classList.add('onshow');
    document.querySelector('.popup').classList.add('onshow');

    function containsQuestionMark(message) {
        return message.indexOf('?') !== -1;
    }

    function closePopup() {
        document.querySelector('.popupblur').classList.remove('onshow');
        document.querySelector('.popup').classList.remove('onshow');
    }
    timeOutPopup = setTimeout(closePopup, 5000);
}

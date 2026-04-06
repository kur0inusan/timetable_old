const schedules = {
    1: [ // 月曜日
        { start: 490, id: 'mon-1' },
        { start: 550, id: 'mon-2' },
        { start: 610, id: 'mon-3' },
        { start: 670, id: 'mon-4' },
        { start: 760, id: 'mon-5' },
        { start: 820, id: 'mon-6' },
    ],
    2: [ // 火曜日
        { start: 490, id: 'tue-1' },
        { start: 550, id: 'tue-2' },
        { start: 610, id: 'tue-3' },
        { start: 670, id: 'tue-4' },
        { start: 760, id: 'tue-5' },
        { start: 820, id: 'tue-6' },
    ],
    3: [ // 水曜日
        { start: 490, id: 'wed-1' },
        { start: 550, id: 'wed-2' },
        { start: 610, id: 'wed-3' },
        { start: 670, id: 'wed-hr' },
        { start: 700, id: 'wed-4' },
        { start: 790, id: 'wed-5' },
        { start: 850, id: 'wed-6' },
    ],
    4: [ // 木曜日
        { start: 490, id: 'thu-1' },
        { start: 550, id: 'thu-2' },
        { start: 610, id: 'thu-3' },
        { start: 670, id: 'thu-4' },
        { start: 760, id: 'thu-5' },
        { start: 820, id: 'thu-6' },
    ],
    5: [ // 金曜日
        { start: 490, id: 'fri-1' },
        { start: 550, id: 'fri-2' },
        { start: 610, id: 'fri-3' },
        { start: 670, id: 'fri-4' },
        { start: 760, id: 'fri-5' },
        { start: 820, id: 'fri-6' },
    ],
    6: [ // 土曜日
        { start: 490, id: 'sat-1' },
        { start: 550, id: 'sat-2' },
        { start: 610, id: 'sat-3' },
        { start: 670, id: 'sat-4' },
    ]
};

let timetable = {
    mon: [
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
    ],
    tue: [
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
    ],
    wed: [
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
    ],
    thu: [
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
    ],
    fri: [
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
    ],
    sat: [
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
        { subject: "" },
    ]
};


function updateDateTime() {
    const now = new Date();

    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月は0始まりなので+1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const days = ['Sat', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekDay = days[now.getDay()];

    const dateString = `${month}/${day} ${weekDay}`;
    const timeString = `${hours}:${minutes}:${seconds}`;

    document.getElementById('date').textContent = dateString;
    document.getElementById('time').textContent = timeString;
};


// ページ読み込み時、保存されていれば初期選択状態に反映
window.addEventListener('DOMContentLoaded', () => {
    const preset = localStorage.getItem('timetablePreset') || '1';
    LoadPreset();
    UpdateTable();
    UpdateText();
});

async function LoadPreset() {
    document.getElementById("classChoice").innerHTML = "";
    for (let i = 1; i <= 8; i++) {
        document.getElementById("classChoice").innerHTML += `<option value="${i}">${i}組</option>`;
    }
    const preset = localStorage.getItem('timetablePreset') || '1';
    document.getElementById("classChoice").value = preset;
    const response = await fetch(`timetables/${preset}.json`);
    const data = await response.json();
    timetable = data;
    UpdateTable();
    UpdateText();
}

function SavePreset() {
    const selectedPreset = document.getElementById('classChoice').value;
    localStorage.setItem('timetablePreset', selectedPreset);
    LoadPreset();
}

function UpdateTable() {
    const dayKeys = ["mon", "tue", "wed", "thu", "fri", "sat"];

    dayKeys.forEach(dayKey => {
        timetable[dayKey].forEach((cellData, index) => {
            const cellId = `${dayKey}-${index + 1}`;
            const cell = document.getElementById(cellId);

            if (cell) {
                const mainInfo = cell.querySelector('.main-info');
                mainInfo.textContent = cellData.subject;
            }
        });
    });
}

document.getElementById('classChoice').addEventListener('change', SavePreset);

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('timetable');
    const table = document.createElement('table');

    // ★ border="1" をここで設定！
    table.setAttribute('border', '1');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const days = ["月", "火", "水", "木", "金", "土"];
    const dayKeys = ["mon", "tue", "wed", "thu", "fri", "sat"];

    // ヘッダー作成
    days.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // 行作成
    const tbody = document.createElement('tbody');
    for (let period = 0; period < 6; period++) {
        const row = document.createElement('tr');

        dayKeys.forEach((dayKey, index) => {
            const cellData = timetable[dayKey][period];

            const td = document.createElement('td');

            // ★ idを「mon-1」のように自動で設定
            const cellId = `${dayKey}-${period + 1}`;
            td.setAttribute('id', cellId);

            const divMain = document.createElement('div');
            divMain.className = 'main-info';
            divMain.textContent = cellData.subject;

            td.appendChild(divMain);
            row.appendChild(td);
        });

        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    container.appendChild(table);

    updateDateTime();
    UpdateText();
});


//現在の教科を表示
function GetCurrentSubject() {
    const now = new Date();
    const day = now.getDay(); // 0:日 1:月 2:火 3:水 4:木 5:金 6:土
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours * 60 + minutes; // 現在時刻を「分」で表現
    // 曜日判定用配列
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dayName = days[day];

    let result = '';
    if (day === 3) { // 水曜日
        if (time >= 0 && time < 490) {
            result = 'beforeschool';
        } else if (time >= 490 && time < 540) {
            result = 'wed-1';
        } else if (time >= 550 && time < 600) {
            result = 'wed-2';
        } else if (time >= 610 && time < 660) {
            result = 'wed-3';
        } else if (time >= 670 && time < 700) {
            result = 'wed-hr';
        } else if (time >= 700 && time < 750) {
            result = 'wed-4';
        } else if (time >= 790 && time < 840) {
            result = 'wed-5';
        } else if (time >= 850 && time < 900) {
            result = 'wed-6';
        } else if (time >= 910 && time < 1020){
            result = 'wed-7'
        }else if (time >= 1020 && time < 1440) {
            result = 'afterschool';
        } else {
            result = 'rest';
        }
        
    }else if (day === 6) { // 土曜日
        if (time >= 0 && time < 490) {
            result = 'beforeschool';
        } else if (time >= 490 && time < 540) {
            result = 'sat-1';
        } else if (time >= 550 && time < 600) {
            result = 'sat-2';
        } else if (time >= 610 && time < 660) {
            result = 'sat-3';
        } else if (time >= 670 && time < 720) {
            result = 'sat-4';
        } else if (time >= 720 && time < 1440) {
            result = 'afterschool';
        } else {
            result = 'rest';
        }
    }else if(day!=0){
        if (time >= 0 && time < 490) {
            result = 'beforeschool';
        } else if (time >= 490 && time < 540) {
            result = `${dayName}-1`;
        } else if (time >= 550 && time < 600) {
            result = `${dayName}-2`;
        } else if (time >= 610 && time < 660) {
            result = `${dayName}-3`;
        } else if (time >= 670 && time < 720) {
            result = `${dayName}-4`;
        } else if (time >= 760 && time < 810) {
            result = `${dayName}-5`;
        } else if (time >= 820 && time < 870) {
            result = `${dayName}-6`;
        } else if(time >= 910 && time<1020){
            result = `${dayName}-7`;
        } else if (time >= 1020 && time < 1440) {
            result = 'afterschool';
        } else {
            result = 'rest';
        }
    } else {
        result = 'rest';
    }
    const cell = document.getElementById(result);

    if (result === "beforeschool") {
        return "授業前"
    } else if (result === "afterschool") {
        return "放課後"
    } else if (result === "rest") {
        return "休み時間"
    } else if (result === "wed-hr") {
        return "HR"
    } else if (!cell) {
        return "見つかりません"; // 見つからなかったら null を返す
    };

    // cell内のmain-infoクラスのテキストを取得（メイン情報）
    const mainInfo = cell.querySelector('.main-info');
    if (mainInfo) {
        if (mainInfo.textContent.trim() === "") {
            return "放課後";
        }
        return mainInfo.textContent.trim();
    }
};

//次の教科を表示
function GetNextSubject() {
    const now = new Date();
    const day = now.getDay(); // 0:日 1:月 2:火 3:水 4:木 5:金 6:土
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const time = hours * 60 + minutes;

    const todaySchedule = schedules[day];

    if (!todaySchedule) {
        return "休み時間";
    }
    // 現在時刻より後の授業を探す
    for (let i = 0; i < todaySchedule.length; i++) {
        if (time < todaySchedule[i].start) {
            const cell = document.getElementById(todaySchedule[i].id);
            if (!cell) {
                return "見つかりません";
            }
            if (todaySchedule[i].id === "wed-hr") {
                return "HR";
            }
            const mainInfo = cell.querySelector('.main-info');
            if (mainInfo.textContent.trim() === "") {
                return "放課後";
            }
            if (mainInfo) {
                return mainInfo.textContent.trim();
            }
        }
    }

    // もし全ての授業が終わっていた場合
    return "放課後";
};

//テキストをアップデート
function UpdateText() {
    document.getElementById("nowSubject").textContent = "今:" + GetCurrentSubject();
    document.getElementById("nextSubject").textContent = "次:" + GetNextSubject();
};

//繰り返し実行
setInterval(updateDateTime, 1000);
setInterval(UpdateText, 10000);

$("#setting-button").on("click", function () {
    $("#settings").fadeIn();
});

$("#close-button").on("click", function () {
    $("#settings").fadeOut();
});

$(document).on("click", function (event) {
    if (!$(event.target).closest("#settings, #setting-button").length) {
        $("#settings").fadeOut();
    }
});
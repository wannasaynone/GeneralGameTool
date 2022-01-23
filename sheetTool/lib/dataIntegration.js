


function urlParse() {

    let urlParams = new URL(window.location.href).searchParams
    var sheetID = urlParams.get("id");
    var key = urlParams.get("key");
    var col = urlParams.get("page");
    var url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${col}?alt=json&key=${key}`

    return url;
}

function getData(url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then((json) => {
            // console.log(json);
            dataIntegration(json)
        })
        .catch(function (error) {
            console.error(error);
        })
}

function dataIntegration(sheetData) {
    let data = sheetData.values
    let jsonDataLength = data.length;
    let jsonKeyRow = data[0];
    let temJson = [];

    for (let i = 0; i < jsonKeyRow.length; i++) {//從 key 開始
        // console.log(jsonKeyRow[i])
        if (jsonKeyRow[i].indexOf("NOEX") > -1) {
            continue;
        } else {
            // if (i == 3) { debugger }
            // [{ id }, { id }]
            for (let x = 1; x < data.length; x++) {
                if (data[x][i] == "") continue;
                if (temJson[x - 1]) {
                    temJson[x - 1][jsonKeyRow[i]] = checkToNum(data[x][i]);
                } else {
                    let tem = {};
                    tem[jsonKeyRow[i]] = checkToNum(data[x][i]);
                    temJson.push(tem)
                }
            }
        }
    }
    console.log("temJson= ", JSON.stringify(temJson))

    document.getElementById("jsonText").innerHTML = JSON.stringify(temJson)
    // console.log("json: ", temJson);
}

function checkToNum(val) {
    if (/^\d+$/.test(val)) {
        return parseInt(val);
    } else {
        return val;
    }
}

function main() {
    let url = urlParse();
    getData(url);
}

const ex = [
    {
        "ID": 0,
        "SP": 0,
        "NameContextID": 0,
        "DescriptionContextID": 0,
        "IsDrop": 0
    },
    {
        "ID": 1,
        "SP": 0,
        "NameContextID": 1,
        "DescriptionContextID": 2,
        "AnimationInfo": "Attack0;\n0.58_Damage_1;\n0.58_SFX_NormalHit;\n0.58_Show_Hit16_Target;",
        "Command": "OnActived\n{\n     DealDamage(SelectOther(Opponent, Manual, 1), Self.Attack * 1.5, 0);\n}",
        "IsDrop": 1
    }]
const exam = {
    value: [
        [
            "ID",
            "AppearanceDataID",
            "Attack",
            "Defense",
            "Speed",
            "HP",
            "SP",
            "SkillIDs",
            "BuffIDs",
            "AI",
            "NOEX_NOTE"
        ],
        [
            "1",
            "10001",
            "33",
            "0",
            "0",
            "330",
            "100",
            "10000",
            "",
            "CastSkill(10000);",
            "下水道老鼠"
        ],
        [
            "2",
            "10002",
            "0",
            "390",
            "600",
            "3300",
            "100",
            "10005;10007",
            "",
            "CastSkill(10007);",
            "守衛機器人30001型"
        ]]
}


main();
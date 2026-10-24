const canvas = document.getElementById("profileCanvas");
const ctx = canvas.getContext("2d");
function drawLine(ctx,begin,end,stroke = "black",width = 1,alpha = 0.5) 
{
    ctx.save(); // 描画設定を一時保存

    ctx.globalAlpha = alpha;

    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();

    ctx.restore(); // 元の描画設定に戻す
}
function countChars(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 255) {
      count += 1; // 半角文字の場合は1文字としてカウント
    } else {
      count += 2; // 全角文字の場合は2文字としてカウント
    }
  }
  return count;
}
function lightenColor(color, amount = 0.4) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    const newR = Math.round(r + (255 - r) * amount);
    const newG = Math.round(g + (255 - g) * amount);
    const newB = Math.round(b + (255 - b) * amount);

    return `#${[newR, newG, newB]
        .map(v => v.toString(16).padStart(2, "0"))
        .join("")}`;
}



const fontSelect = document.getElementById("fontSelect");


let drawingId = 0;

async function drawProfileWithFont() {
    const currentId = ++drawingId;
    const selectedFont = document.getElementById("fontSelect").value;

    try {
        await document.fonts.load(`30px "${selectedFont}"`);
    } catch (error) {
        console.error("フォントの読み込みに失敗しました:", error);
    }

    // 待っている間に別のフォントが選ばれたら、古い描画はしない
    if (currentId !== drawingId) return;

    drawProfile();
}

// =========================ボタンを押したときに画像を生成==================
function drawProfile(){

  // 入力値を取得する関数
  function getValue(id) {
    return document.getElementById(id).value || "";
  }

  // selectの選択肢について、画面上の表示文字を取得
  function getSelectedText(id) {
    const select = document.getElementById(id);
    return Array.from(select.selectedOptions)
      .map(option => option.textContent)
      .join("、") || "";
  }

  // チェックボックスで選択された項目を取得
  function getChecked(name) {
    return Array.from(
      document.querySelectorAll(`input[name="${name}"]:checked`)
    ).map(input => {
      return input.nextElementSibling.textContent;
    }).join("、") || "";
  }

  // 通常のselectから表示文字を取得
  function getSelectText(id) {
    const select = document.getElementById(id);
    return select.options[select.selectedIndex].textContent;
  }

  //------------ここから画面の話-------------------///

    // 画像サイズを固定
    canvas.width = 900;
    canvas.height = 1200;

    const selectedFont = document.getElementById("fontSelect").value;


    // 色
    const bgColor =document.getElementById("bgColor").value;
    const textColorInput = document.getElementById("textColor").value;

    const mainColor = bgColor;
    const subColor  = lightenColor(mainColor,0.3);
    const textColor = textColorInput;

    //----------------------プロフエリア-------------------//
    ctx.fillStyle = lightenColor(mainColor,0.9);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //--------エリア分け-----------------------------------------
    // プロフィールエリア----------
    ctx.fillStyle = `#ffffff`;
    ctx.beginPath();
    ctx.roundRect(40, 40, 820, 370,25);
    ctx.fill();
    
    ctx.strokeStyle = subColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(40, 40, 820, 370,25);
    ctx.stroke();

    //嗜好エリア------------------
    ctx.fillStyle = `#ffffff`;
    ctx.beginPath();
    ctx.roundRect(40, 420, 820, 550,25);
    ctx.fill();

    ctx.strokeStyle = subColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(40, 420, 820,550,25);
    ctx.stroke();
    drawLine(ctx,[450,500],[450,875],subColor,2,1);

        //----タイトル-----------------------
    ptPosition={x:245,y:480,fontSize:35,gapud:5,gaprl:40};
    stPosition={x:695-35,y:ptPosition.y,fontSize:35,gapud:ptPosition.gapud,gaprl:ptPosition.gaprl-5};
    ctx.fillStyle = mainColor;
    ctx.beginPath();
    ctx.roundRect(
        ptPosition.x-4*ptPosition.fontSize-ptPosition.gaprl,
        ptPosition.y-ptPosition.fontSize-ptPosition.gapud ,
        8*ptPosition.fontSize+2*ptPosition.gaprl,
        ptPosition.fontSize*1.2+ptPosition.gapud*2, 10);
    ctx.fill();

    ctx.beginPath();
        ctx.roundRect(
        stPosition.x-4*stPosition.fontSize-stPosition.gaprl,
        stPosition.y-stPosition.fontSize-stPosition.gapud ,
        8*stPosition.fontSize+2*stPosition.gaprl,
        stPosition.fontSize*1.2+stPosition.gapud*2, 10);
    ctx.fill();


    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = `${ptPosition.fontSize}px sans-serif`;
    ctx.fillText("部位のOK・NG",ptPosition.x,ptPosition.y);

    ctx.font =`${stPosition.fontSize}px sans-serif`;
    ctx.fillText("プレイのOK・NG",stPosition.x,stPosition.y);

    



    ctx.textAlign = "left"
    //自己紹介エリア-------------------
    ctx.fillStyle = `#ffffff`;
    ctx.beginPath();
    ctx.roundRect(40, 980, 820, 190,25);
    ctx.fill();

    ctx.strokeStyle = subColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(40, 980, 820,190,25);
    ctx.stroke();

    introPosition={x:60,y:1000,fontSize:35,gapud:ptPosition.gapud,gaprl:ptPosition.gaprl};
    ctx.fillStyle =mainColor;
    ctx.beginPath();
    ctx.roundRect(
        introPosition.x,
        introPosition.y,
        4*introPosition.fontSize+2*introPosition.gaprl,
        introPosition.fontSize+introPosition.gapud*3, 10);
    ctx.fill();

    ctx.font=`${introPosition.fontSize}px sans-sarif`;
    ctx.fillStyle = `#ffffff`;
    ctx.fillText("自己紹介",introPosition.x+introPosition.gaprl,introPosition.y+introPosition.gapud+introPosition.fontSize)



    // 名前-----------------------------------------------------


    ctx.fillStyle = textColor;
    const namePosition = {x:80,y:160,fontSize:75}
    ctx.font = `bold ${namePosition.fontSize}px "${selectedFont}", sans-serif`;
    ctx.fillText(getValue("name"),namePosition.x,namePosition.y);
    
    const namelen = countChars(getValue("name"));
    drawLine(ctx,[namePosition.x+2,namePosition.y+5],
        [namePosition.x+5+ namelen * namePosition.fontSize/2,namePosition.y+5],subColor,5,0.5);

    // 年齢：右上----------------------------------------------------
    ctx.font = `20px sans-serif`;
    ctx.fillStyle = subColor;
    ctx.fillText("年齢", 80, 230);

    ctx.font = `50px "${selectedFont}", ${selectedFont}`;
    ctx.fillStyle = textColor;
    const age =document.getElementById("age").value
        ? document.getElementById("age").value 
        : "";
    ctx.fillText(age, 90, 280);

    const agelen = countChars(age);
    if (agelen > 0) {
        drawLine(ctx,[80,285],[95 + agelen*25,285],subColor,5,0.5);
    }else{
        drawLine(ctx,[80,285],[95 + 4*25,285],subColor,5,0.5);
    }



    // 活動エリア：年齢の横
    ctx.font = `20px sans-serif`;
    ctx.fillStyle = subColor;
    ctx.fillText("活動エリア", 80, 340);

    ctx.font = `36px "${selectedFont}", sans-seif`;
    ctx.fillStyle = textColor;
    ctx.fillText(getValue("area"), 80, 390);

    const arealen = countChars(getValue("area"));
    if (arealen > 0) {
        drawLine(ctx,[75,395],[90 + arealen * 18,395],subColor,5,0.5);
    }else{
        drawLine(ctx,[75,395],[85 + 10*18,395],subColor,5,0.5);
    }

    // ぐり：ぐらの比率---------------------------
    ctx.textAlign = "center";
    const ggPosition={x:650,y:115,gap:80,fontSize:80}
    ctx.font = `30px sans-serif`;
    ctx.fillStyle = subColor;
    ctx.fillText("ぐり  ：  ぐら", ggPosition.x,ggPosition.y);

    
    ctx.font = `${ggPosition.fontSize-10}px "${selectedFont}", sans-serif`;
    ctx.fillText(":", ggPosition.x, ggPosition.y+75);

    ctx.textAlign="right"
    ctx.font = `${ggPosition.fontSize}px "${selectedFont}", sans-seif`;
    ctx.fillStyle = textColor;
    ctx.fillText((document.getElementById("guri").value || "0") ,
    ggPosition.x-35,ggPosition.y+ggPosition.gap
    );
    drawLine(ctx,[ggPosition.x-(ggPosition.fontSize-5)*1.5-5,200],[ggPosition.x-(ggPosition.fontSize-10)/2,200],subColor,5,0.5);

    ctx.textAlign="left"
    ctx.fillText(
    (document.getElementById("gura").value || "0"),
    ggPosition.x+35,ggPosition.y+ggPosition.gap);
    drawLine(ctx,[ggPosition.x+(ggPosition.fontSize-5)*1.5+5,200],[ggPosition.x+(ggPosition.fontSize-10)/2,200],subColor,5,0.5);

    // 性別--------------------------------------
    ctx.textAlign="center"
    ctx.font = `20px sans-serif`;
    ctx.fillStyle = subColor;
    ctx.fillText("性別", 300, 230);

    ctx.font = `50px "${selectedFont}", sans-seif`;
    ctx.fillStyle = textColor;
    ctx.fillText(getValue("gender") || "",350,280);

    const genderlen = countChars(getValue("gender")||"");
    if (genderlen > 0) {
        drawLine(ctx,[350-genderlen*25/2,285],[350 + genderlen*25/2,285],subColor,5,0.5);
    }else{
        drawLine(ctx,[350-2*25/2,285],[350 + 4*25/2,285],subColor,5,0.5);
    }

    // 募集相手----------------------------------
    const recruitPosition = {
    x: 550,       // 左端
    y: 300,       // 文字の縦位置
    fontSize: 40, // 文字サイズ
    gap: 35,      // 文字と円の余白
    itemGap: 15,   // 選択肢同士の間隔
    rowGap:70
    };

    ctx.font = `20px sans-serif`;
    ctx.fillStyle = subColor;
    ctx.fillText("募集相手",recruitPosition.x,recruitPosition.y-40)

    // 2段に分けて配置
    const recruitRows = [
        ["紳士", "淑女"],
        ["両方", "募集なし"]
    ];

    ctx.font = `${recruitPosition.fontSize}px sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    const recruitSelect = document.getElementById("recruit");
    const selectedRecruit = Array.from(recruitSelect.selectedOptions)
        .map(option => option.textContent);
    // 同じ段の選択肢の間隔

    recruitRows.forEach((row, rowIndex) => {
        let x = recruitPosition.x;
        const y = recruitPosition.y + rowIndex * recruitPosition.rowGap;

        row.forEach(option => {
            const textWidth = ctx.measureText(option).width;

            // 選択肢の文字
            ctx.fillStyle = mainColor;
            ctx.fillText(option, x, y);

            // 選択されていたら〇を描く
            ctx.globalAlpha =0.5;
            if (selectedRecruit.includes(option)) {
                ctx.beginPath();
                ctx.ellipse(
                    x + textWidth / 2,
                    y,
                    textWidth / 2 + recruitPosition.gap / 2,
                    recruitPosition.fontSize * 0.8,
                    0,
                    0,
                    Math.PI * 2
                );

                ctx.strokeStyle = textColor;
                ctx.lineWidth = 3;
                ctx.stroke();
            }
            ctx.globalAlpha =1;

            // 次の選択肢の位置
            x += textWidth + recruitPosition.itemGap + recruitPosition.gap;
        });
    });

    // 描画設定を戻す
    ctx.textBaseline = "alphabetic";

    //-----------部位関係--------------------------------------------
    const partsRows=[
        ["頭","耳","首"],
        ["腕","脇","脇腹"],
        ["胸","お腹","背中"],
        ["背中","お尻"],
        ["太もも","足裏"],
        ["デリケートゾーン"]
    ]
    const partsPosition = {
    x: 250,       // 左端
    y: 550,       // 文字の縦位置
    fontSize: 30, // 文字サイズ
    gap: 35,      // 文字と円の余白
    itemGap: 10,   // 選択肢同士の間隔
    rowGap:55
    };

    // HTMLで選択されている項目
    const likepartsSelect = document.getElementById("like_parts");

    const selectedlikepart = Array.from(
        document.querySelectorAll('input[name="like_parts"]:checked'))
            .map(input => input.nextElementSibling.textContent);

    const dislikePartsSelect = document.getElementById("dislike_parts");
    const selectedDislikeParts = Array.from(
        document.querySelectorAll('input[name="dislike_parts"]:checked'))
            .map(input =>input.nextElementSibling.textContent);

    // 文字の設定
    ctx.font = `${partsPosition.fontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    partsRows.forEach((row, rowIndex) => {
        const y = partsPosition.y + rowIndex * partsPosition.rowGap;

        // その行全体の幅を計算
        const widths = row.map(option => ctx.measureText(option).width);

        const totalWidth = widths.reduce((sum, width) => sum + width, 0)
            + (row.length - 1) * (partsPosition.itemGap + partsPosition.gap);

        // キャンバスの中央から、行全体の幅の半分だけ左へ
        let x = partsPosition.x - totalWidth / 2;

        row.forEach((option, index) => {
            const textWidth = widths[index];
            const centerX = x + textWidth / 2;

            ctx.fillStyle = mainColor;
            ctx.fillText(option, centerX, y);

            if (selectedlikepart.includes(option)) {
                ctx.beginPath();
                ctx.ellipse(
                    centerX,
                    y,
                    textWidth / 2 + partsPosition.gap / 2,
                    partsPosition.fontSize * 0.8,
                    0, 0, Math.PI * 2
                );

                ctx.strokeStyle = textColor;
                ctx.lineWidth = 3;
                ctx.stroke();
            }
            if (selectedDislikeParts.includes(option)) {
                const size = partsPosition.fontSize * 0.35;

                ctx.beginPath();
                ctx.moveTo(centerX - size*3.5, y - size-1);
                ctx.lineTo(centerX + size*3.5, y + size+2);
                ctx.moveTo(centerX + size*3.5, y - size-1);
                ctx.lineTo(centerX - size*3.5, y + size+2);

                ctx.strokeStyle = `#c65b65`;
                ctx.lineWidth = 4;
                ctx.globalAlpha = 0.6;
                ctx.stroke();

                ctx.globalAlpha = 1;
            }
            


            x += textWidth + partsPosition.itemGap + partsPosition.gap;
        });
    });

    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    //シチュエーション--------------------------------------------------//

    const situPosition = {
    x: 1315,       // 左端
    y: 550,       // 文字の縦位置
    fontSize: 27, // 文字サイズ
    gap: 35,      // 文字と円の余白
    itemGap: 10,   // 選択肢同士の間隔
    rowGap:50
    };

    situRows=[
        ["ハードプレイ","ソフトプレイ"],
        ["フェザータッチ","目隠し"],
        ["ローション・オイル"],
        ["パウダー","ブラシ"],
        ["脱衣","罰ゲーム","言葉責め"],
        ["仕返し","人力拘束"],
        ["精神拘束","拘束具"]
    ]


    const likestuSelect = document.getElementById("like_situation");

    const selectedlikesitu = Array.from(
        document.querySelectorAll('input[name="like_situation"]:checked'))
            .map(input => input.nextElementSibling.textContent);

    const dislikestuSelect = document.getElementById("dislike_situation");

    const selectedDislikesitu = Array.from(
        document.querySelectorAll('input[name="dislike_situation"]:checked'))
            .map(input => input.nextElementSibling.textContent);

    // 文字の設定
    ctx.font = `${situPosition.fontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    situRows.forEach((row, rowIndex) => {
        const y = situPosition.y + rowIndex * situPosition.rowGap;

        // その行全体の幅を計算
        const widths = row.map(option => ctx.measureText(option).width);

        const totalWidth = widths.reduce((sum, width) => sum + width, 0)
            + (row.length - 1) * (situPosition.itemGap + situPosition.gap);

        // キャンバスの中央から、行全体の幅の半分だけ左へ
        let x = (situPosition.x - totalWidth) / 2;

        row.forEach((option, index) => {
            const textWidth = widths[index];
            const centerX = x + textWidth / 2;

            ctx.fillStyle = mainColor;
            ctx.fillText(option, centerX, y);

            if (selectedlikesitu.includes(option)) {
                ctx.beginPath();
                ctx.ellipse(
                    centerX,
                    y,
                    textWidth / 2 + situPosition.gap / 2,
                    situPosition.fontSize * 0.8,
                    0, 0, Math.PI * 2
                );

                ctx.strokeStyle = textColor;
                ctx.lineWidth = 3;
                ctx.stroke();
            }
            if (selectedDislikesitu.includes(option)) {
                const size = situPosition.fontSize * 0.35;

                ctx.beginPath();
                ctx.moveTo(centerX - size*4, y - size-3);
                ctx.lineTo(centerX + size*4, y + size+6);
                ctx.moveTo(centerX + size*4, y - size-3);
                ctx.lineTo(centerX - size*4, y + size+6);

                ctx.strokeStyle = `#c65b65`;
                ctx.lineWidth = 4;
                ctx.globalAlpha = 0.7;
                ctx.stroke();

                ctx.globalAlpha = 1;
            }

            x += textWidth + situPosition.itemGap + situPosition.gap;
        });
    });

    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    ctx.font = `22px sans-serif`;
    ctx.fillStyle = mainColor;
    ctx.fillText("＜ 部位やプレイについて ＞",70,890);

    drawLine(ctx,[70+13*22,885],[825,885],mainColor,2,alpha=1);

    const tastetext = document.getElementById("taste_other").value;
    const tlines = tastetext.split("\n");

    const tlineCount = tastetext.split("\n").length;
    if(tlineCount<=1){
        tastefont = 30;
        tastey = 910;
    }else{
        tastefont = 27;
        tastey = 895;
    };

    const tastePosition = {
        x: 100,
        y: tastey,
        fontSize: tastefont,
        lineHeight: 35
    };

    ctx.font = `${tastePosition.fontSize}px "${selectedFont}", sans-seif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = textColor;

    tlines.forEach((line, index) => {
        ctx.fillText(
            line,
            tastePosition.x,
            tastePosition.y + index * tastePosition.lineHeight
        );
    });

    //自己紹介----------------------------------------------------
    const selfIntro = document.getElementById("introduction").value;
    const lines = selfIntro.split("\n");

    const lineCount = selfIntro.split("\n").length;
    if(lineCount<=1){
        introfont = 35;
        introy = 1080;
    }else{
        introfont =30;
        introy = 1055;
    };

    const selfintPosition = {
        x: 80,
        y: introy,
        fontSize: introfont,
        lineHeight: 40
    };

    ctx.font = `${selfintPosition.fontSize}px "${selectedFont}", sans-seif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    lines.forEach((line, index) => {
        ctx.fillText(
            line,
            selfintPosition.x,
            selfintPosition.y + index * selfintPosition.lineHeight
        );
    });



    const contactPosition = {
        x: 740,       // キャンバスの中央
        y: 1020,       // 1行目の高さ
        fontSize: 30,
        rowGap: 50,
        itemGap: 15,
        gap: 10
    };

    // 2段に分けて配置
    const contactRows = [
        ["LINE","DM"],
        [ "インスタ","イメプ"],
        ["その他","会う"]
    ];

    ctx.font = `${contactPosition.fontSize}px sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const contactIds = {
        "DM": "dm",
        "インスタ": "insta",
        "LINE": "line",
        "イメプ": "imagePlay",
        "その他": "other",
        "会う": "meeting"
    };


    ctx.font = `${contactPosition.fontSize}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    contactRows.forEach((row, rowIndex) => {
        const y = contactPosition.y + rowIndex * contactPosition.rowGap;

        // その行全体の幅を計算
        const widths = row.map(option => ctx.measureText(option).width);

        const totalWidth = widths.reduce((sum, width) => sum + width, 0)
            + (row.length - 1) * (contactPosition.itemGap + contactPosition.gap);

        // 行全体を中央ぞろえ
        let x = contactPosition.x - totalWidth / 2;

        row.forEach((option, index) => {
            const textWidth = widths[index];
            const centerX = x + textWidth / 2;

            // 選択状態を取得
            const value = document.getElementById(contactIds[option]).value;

            let mark = "";
            
            if (value === "OK") {
                mark = "〇";
            } else if (value === "NG") {
                mark = "✕";
            } else if (value === "仲良くなってから") {
                mark = "△";
            }　else if(value=="歓迎"){
                mark = "◎";
            }

            // 項目名
            ctx.fillStyle = mainColor;
            ctx.fillText(option, centerX, y);

            // 選択状態に応じた印を文字に重ねる
            if (mark !== "") {
                ctx.save();

                ctx.font = `${contactPosition.fontSize + 8}px sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                ctx.strokeStyle = mark === "✕" ? "#c65b65" : textColor;
                ctx.lineWidth = 3;

                ctx.globalAlpha =0.6;
                if (mark === "〇") {
                    ctx.beginPath();
                    ctx.ellipse(
                        centerX,
                        y,
                        textWidth / 2 + contactPosition.gap / 2,
                        contactPosition.fontSize * 0.8,
                        0, 0, Math.PI * 2
                    );
                    ctx.stroke();
                } else if (mark === "✕") {
                    const size = contactPosition.fontSize * 0.35;

                ctx.beginPath();
                ctx.moveTo(centerX - size*3, y - size-1);
                ctx.lineTo(centerX + size*3, y + size+2);
                ctx.moveTo(centerX + size*3, y - size-1);
                ctx.lineTo(centerX - size*3, y + size+2);
                    ctx.stroke();
                } else if (mark === "△") {
                    const size = contactPosition.fontSize * 0.8;

                    ctx.beginPath();
                    ctx.moveTo(centerX, y - size);
                    ctx.lineTo(centerX - size, y + size * 0.7);
                    ctx.lineTo(centerX + size, y + size * 0.7);
                    ctx.closePath();
                    ctx.stroke();
                } else if(mark=="◎"){
                    const size = contactPosition.fontSize * 0.8;

                    ctx.beginPath();
                    ctx.ellipse(
                        centerX,
                        y,
                        textWidth / 2 + contactPosition.gap / 2,
                        contactPosition.fontSize * 0.8,
                        0, 0, Math.PI * 2
                    );
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.ellipse(
                        centerX,
                        y,
                        textWidth / 4 + contactPosition.gap / 2 ,
                        contactPosition.fontSize * 0.4,
                        0, 0, Math.PI * 2
                    );
                    ctx.stroke();
                };
                ctx.globalAlpha = 1;

                ctx.restore();
            }

            x += textWidth + contactPosition.itemGap + contactPosition.gap;
        });
    });

    ctx.fillStyle ="#0b0b0b4c";
    ctx.textAlign ="center";
    ctx.font = " 20px sans-serif";
    ctx.fillText("製作： そーた @m0NoGpl3ok72873",450,1182);
    ctx.textAlign ="left"
}

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        drawProfile();
    });
});
document.querySelectorAll("input, select, textarea").forEach(element => {
    if (element.id === "generate" || element.id === "fontSelect") return;

    element.addEventListener("input", drawProfileWithFont);
    element.addEventListener("change", drawProfileWithFont);
});

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener("change", drawProfileWithFont);
});
drawProfileWithFont();
fontSelect.addEventListener("change", () => {
    drawProfile();
});
document.getElementById("downloadImage").addEventListener("click", function () {
    const canvas = document.getElementById("profileCanvas");

    canvas.toBlob(function (blob) {
        if (!blob) {
            alert("画像の作成に失敗しました。");
            return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "ぐりぐらプロフィール.png";
        link.click();

        URL.revokeObjectURL(url);
    }, "image/png");
});

/**
 * ЖЁСТКАЯ ПРИВЯЗКА ФОТОГРАФИЙ (Hard Mapping)
 * 
 * Ключ = id объекта из ALL_OBJECTS (obj-1 ... obj-43, с пропусками удалённых) после нормализации в PassportPanel.
 * Значение = ТОЧНЫЙ массив имён файлов, которые реально лежат в папке public/photos/<photosFolder>/ 
 * 
 * НИКАКИХ догадок, Array.from, glob, транслита адресов и т.п.
 * Галерея рендерится ТОЛЬКО по этому реестру.
 * 
 * Обновляется вручную при добавлении/удалении фото в папках.
 */

export const PHOTO_REGISTRY: Record<string, string[]> = {
  // obj-1: Доходный дом страхового общества «Россия» (Сретенский бульвар, 6/1)
  "obj-1": [
    "1.jpg",
    "rossiya1 (1).jpg",
    "rossiya1 (1).png",
    "rossiya1 (10).jpg",
    "rossiya1 (2).jpg",
    "rossiya1 (3).jpg",
    "rossiya1 (4).jpg",
    "rossiya1 (5).jpg",
    "rossiya1 (6).jpg",
    "rossiya1 (7).jpg",
    "rossiya1 (8).jpg",
    "rossiya1 (9).jpg"
  ],

  // obj-2: Колпачный переулок, дом 5 (Усадьба А.Л. Кнопа)
  "obj-2": [
    "1.jpg",
    "knop10.jpg",
    "knop2.jpg",
    "knop3.jpg",
    "knop4.jpg",
    "knop5.jpg",
    "knop6.jpg",
    "knop7.jpg",
    "knop8.jpg",
    "knop9.jpg",
    "Усадьба А.Л. Кнопа (1).jfif",
    "Усадьба А.Л. Кнопа (1).jpg",
    "Усадьба А.Л. Кнопа (2).jfif",
    "Усадьба А.Л. Кнопа (2).jpg",
    "Усадьба А.Л. Кнопа (3).jfif",
    "Усадьба А.Л. Кнопа (3).jpg",
    "Усадьба А.Л. Кнопа (4).jfif",
    "Усадьба А.Л. Кнопа (4).jpg",
    "Усадьба А.Л. Кнопа (5).jpg",
    "Усадьба А.Л. Кнопа (6).JPG"
  ],

  // obj-3: Спиридоновка, 17 (Особняк Зинаиды Морозовой)
  "obj-3": [
    "1.jpg",
    "Особняк_Зинаиды_Морозовой_на_Спиридоновке.jpg"
  ],

  // obj-4: Колпачный переулок, д. 10
  "obj-4": [
    "1.jpg",
    "BABEBBBFB087BD8BB910_2.jpeg",
    "XXL_height.jfif",
    "orig (1).jfif",
    "orig.jfif",
    "Палаты_Мазепы_4.JPG"
  ],

  // obj-5: Покровский бульвар 5
  "obj-5": [
    "1.jpg",
    "362fd065e64a1861be6e1e97fc97b7bb.webp",
    "XXL_height.jfif",
    "kvartry-v-zhk-rezidentsija-na-pokrovskom-bulvare-1543230337.1038_.jpg",
    "orig.jfif",
    "rezidenciya-na-pokrovskom-bulvare-ak-2.jpg"
  ],

  // obj-6: Спиридоновка, 12
  "obj-6": [
    "1.jpg",
    "img_5923.jpg",
    "orig.jfif",
    "загруженное (1).jfif",
    "загруженное.jfif"
  ],

  // obj-7: Особняк А. И. Кекушевой (Остоженка, 21)
  "obj-7": [
    "1.jpg",
    "2.jpg",
    "3.jpg"
  ],

  // obj-8: Малый Никитский пер., 6
  "obj-8": [
    "1.jpg",
    "46151_original.jpg",
    "b9b4f4fb6c.jpg",
    "i (1).jfif",
    "i.jfif",
    "загруженное.jfif"
  ],

  // obj-9: Милютинский пер., 5
  "obj-9": [
    "1.jpg",
    "IMG_5121 Panorama.jpg",
    "Milyutinsky_Lane_Towers_07.jfif",
    "Milyutinsky_Lane_Towers_08.JPG",
    "i.jfif",
    "tsentralnaya-telefonnaya-stantsiya-ats-926-fasad-0043292926-preview.jpg",
    "загруженное.jfif"
  ],

  // obj-10: Поварская ул., 22
  "obj-10": [
    "1.jpg",
    "131393_2.jpg",
    "22.jpg",
    "7a9048cbe3d5bff1c4340def823ba6f24ce571fc.jpg",
    "Povarskaya_Street_22.jpg",
    "download.jfif",
    "orig.jfif",
    "загруженное (1).jfif",
    "загруженное.jfif"
  ],

  // obj-11: Старосадский пер., д. 9
  "obj-11": [
    "1.jpg",
    "295764.png",
    "9.jpg",
    "Starosadsky_7-10Cx_Jan_2010_01.jpg",
    "Starosadsky_9_Jan_2010_01.jpg",
    "Starosadsky_9_Jan_2010_03.jpg",
    "Stomatologicheskaya-poliklinika-53_1.jpg",
    "XXL_height (1).jfif",
    "gJ1-_IqxjPmx.jpg",
    "sl3(1746).jpg",
    "загруженное.jfif"
  ],

  // obj-12: Большой Харитоньевский пер., 10
  "obj-12": [
    "1.jpg",
    "ofis-moskva-bolshoy-haritonevskiy-pereulok-2819601845-1.jpg",
    "orig (1).jfif",
    "orig.jfif",
    "Москва,_Большой_Харитоньевский_переулок,_10_(1).jpg",
    "Москва,_Большой_Харитоньевский_переулок,_10_(2).jpg"
  ],

  // obj-14: Доходный дом П. Н. Перцовой
  "obj-14": [
    "1.jpg",
    "XXXL (1).jfif",
    "XXXL (2).jfif",
    "XXXL (3).jfif",
    "XXXL (4).jfif",
    "XXXL.jfif"
  ],

  // obj-15: Особняк Арсения Морозова (Воздвиженка, 16)
  "obj-15": [
    "1.jpg",
    "B2BEB7B4B2B8B6B5BDBAB016_3.jpeg",
    "Morozov_Mansion_Vozdvizhenka_str_16_str_1_2016-04-12_2515.jpg",
    "XXL_height (1).jfif",
    "XXL_height.jfif",
    "moroz8.jpg",
    "Воздвиженка_16._Особняк_Морозова02.JPG.jpg"
  ],

  // obj-16: Арбат ул., 29
  "obj-16": [
    "1089706.webp",
    "arbat-29-front-1-watermarked_retina.jpg",
    "i (1).jfif",
    "i (2).jfif",
    "i (3).jfif",
    "i.jfif",
    "orig.jfif",
    "загруженное.jfif"
  ],

  // obj-17: Фролов пер., 2
  "obj-17": [
    "1.jpg",
    "XXL_height.jfif",
    "moskovskii-teatr-et-setera-pod-rukovodstvom-aleksandra-0036171060-preview.jpg",
    "orig.jfif",
    "Москва._Фролов_переулок,_2_(ЭлСетера,_вид_со_Срет.бул)_IMG_2107.3_e1.jpg"
  ],

  // obj-18: Хохловский пер., д. 7-9
  "obj-18": [
    "1.jpg",
    "2086243_original.jpg",
    "7830195_original.jpg",
    "8004384_original.jpg",
    "download.jfif",
    "kak-doekhat-khokhlovskiy-per-7-9.jpg",
    "khokhlovskiy-per-7-9.jpg",
    "khokhlovskiy-pereulok-79s1-front-watermarked.jpg",
    "orig (1).jfif",
    "загруженное.jfif"
  ],

  // obj-19: Лубянский пр., 15
  "obj-19": [
    "1.jpg",
    "XXL_height.jfif",
    "lubyanskiy_5582.jpg",
    "orig (1).jfif",
    "orig (3).jfif",
    "orig.jfif",
    "загруженное.jfif"
  ],

  // obj-20: Мясницкая ул., 7
  "obj-20": [
    "1.jpg",
    "1655de0f787449.jpeg",
    "Moscow,_Myasnitskaya_7_July_2008_03.JPG",
    "XXL_height.jfif",
    "e0cb91ba1e52078eb4dba807b7384aea.jpg",
    "usadba-saltykovyh-chertkovyh-myasnitskaya-ulitsa-0025969364-preview.jpg"
  ],

  // obj-21: Никитский б-р, 11
  "obj-21": [
    "1.jpg",
    "265883_1.jpg",
    "37262_1.jpg",
    "80727.jpg",
    "96828_1.jpg",
    "XXL_height.jfif",
    "nikitskiy-bul-dom-11-12.jpg",
    "загруженное.jfif"
  ],

  // obj-23: Покровка ул., 22
  "obj-23": [
    "0fcea648d7fa2be837b9bf7aacbf3c3f.jpg",
    "1.jpg",
    "17-1388.jpg",
    "Untitled-4(9).jpg",
    "aprak1.jpg",
    "caption.jpg",
    "ehkskursiya-dikovinnye-doma-moskvy.jpg",
    "i.jfif",
    "large_50914d2c62c2e624238952.jpg",
    "og_og_1712398021253121609.jpg",
    "Москва._ул_Покровка,_22_1с1_(Дом_Апраксиных-Трубецких_IMG_2132.3_e1.jpg",
    "комод2.jpg"
  ],

  // obj-24: Пречистенка ул., 8
  "obj-24": [
    "1.jpg",
    "160501057188.jpg",
    "74dfe7a9bd2bebf2d2cf58d72c0ca4db.jpg",
    "9f7eaa16379abd1e7a41445255b9aebf.webp",
    "IMG_20220524_134909.jpeg",
    "Moscow,_Prechistenka_9.jpg",
    "bb8da73869ceb2b00f715e48667a0977.png",
    "caption (1).jpg",
    "caption.jpg",
    "kvartry-v-4601-zhk-prechistenka-8-1604669781_6626.jpg",
    "prechest8-1.jpg"
  ],

  // obj-25: Пятницкая ул., 17
  "obj-25": [
    "1.jpg",
    "XXL_height (1).jfif",
    "XXL_height.jfif",
    "XXXL.jfif",
    "i (1).jfif",
    "i.jfif"
  ],

  // obj-26: Садовая-Каретная ул., 12
  "obj-26": [
    "1.jpg",
    "Moscow,_Sadovaya-Karetnaya_Street,_22,_bld._1.JPG",
    "bqfvif2fsj0de2sn55.webp",
    "normal_df6c5e68ae82380b.png"
  ],

  // obj-27: Садовая-Самотечная ул., 8
  "obj-27": [
    "1.jpg",
    "97125_1.jpg",
    "97125_2.jpg",
    "97125_3.jpg",
    "Moscow,_Sadovaya-Karetnaya_Street,_22,_bld._1.JPG",
    "XXL_height.jfif",
    "normal_df6c5e68ae82380b.png",
    "загруженное (1).jfif",
    "загруженное.jfif"
  ],

  // obj-28: ул. Солянка, д. 12
  "obj-28": [
    "1.jpg",
    "841243.jpg",
    "8dyywojl7r3lwcqcmfbfxm0a5v0jyhkb.png",
    "DSC02073.jpg",
    "_DSC0301.jpg",
    "dom-12-14-na-ulitse-solyanke.jpg",
    "orig (1).jfif",
    "orig (2).jfif"
  ],

  // obj-29: Спиридоновка, 3-5
  "obj-29": [
    "1.jpg",
    "6899a0c7d144b22d92f9ea551301b851.jpg",
    "IMG_6150.jpg",
    "Spiridonovka,_2010_05.jpg",
    "XXL_height (1).jfif",
    "XXL_height.jfif",
    "orig.jfif",
    "загруженное.jfif"
  ],

  // obj-30: Спиридоновка, 21
  "obj-30": [
    "1.jpg",
    "nezhiloe-pomeshcenie-moskva-ulica-spiridonovka-2212560857-1.jpg",
    "orig.jfif",
    "scale_1200.jfif",
    "spiridonovka-ul-dom-21.jpg",
    "загруженное (1).jfif",
    "загруженное (2).jfif",
    "загруженное.jfif"
  ],

  // obj-31: Сретенский бульвар, 2
  "obj-31": [
    "1.jpg",
    "large.jfif",
    "orig (1).jfif",
    "orig.jfif",
    "sretenskiy-bul-2.jpg"
  ],

  // obj-33: Малый Толмачёвский пер., 4
  "obj-33": [
    "1.jpg",
    "164594-9cd2a9a0918fed7fad40a87a1cef30d8.jpg",
    "6fdccf85a5db5a39237e6b2638380c912ee4ef97.jpg",
    "XXL_height.jfif",
    "i.jfif",
    "img (26).jpg",
    "orig.jfif"
  ],

  // obj-34: Тверская ул., 15
  "obj-34": [
    "1.jpg",
    "16133-b5930766ce76249f2ec15f3549d90b83.jpg",
    "16139-a10cd374eceb30ce97b189017e53899a.jpg",
    "2598405900_1200_800_p.jpg",
    "2682437728_1200_800_p.jpg",
    "4-3.jpg",
    "77911c81d7a5.jpg",
    "content_hotel_629718eae41f95.74815181.jpg",
    "kvartira-moskva-tverskaya-ulica-2681989387_1200_800_p.jpg",
    "orig.jfif"
  ],

  // obj-35: Якиманский пер., 6
  "obj-35": [
    "1.jpg",
    "LpiPRKlu6hbQ11Ucak1yhwwBcYyh961JDGtZxxNEBGXbmDSrIaGVchk50QpFGNh7ka-S6K4jViGV8rk6f15WdCOdniTdC48rnII1XWo8J8YNMRjFpdvxDCivsRKr0OyIJziYX52grQ8APHS2GA3tVk16gzGnSo_E5B-xE0IfS5my-NZ9sMK2AkQvnUijNdJbfWn9tLknvWRUR4W6k3hc.jfif",
    "XXL_height (1).jfif",
    "XXL_height (2).jfif",
    "XXL_height (3).jfif",
    "XXL_height (4).jfif",
    "XXL_height.jfif",
    "imperskiy-dom_33027.jpg",
    "imperskiy_dom_1.jpg",
    "imperskiy_dom_2.jpg",
    "imperskiy_dom_6.jpg",
    "orig.jfif"
  ],

  // obj-36: ул. Забелина, д. 3
  "obj-36": [
    "1.jpg",
    "XXL_height (1).jfif",
    "orig (2).jfif",
    "orig (3).jfif",
    "Главный_усадебный_дом_улица_Забелина,_дом_3,_строение_2.jpg",
    "Забелина_д.3_с.2.jpg"
  ],

  // obj-38: Дом Наркомфина (новый, папка novinskiy_25)
  "obj-38": [],

  // obj-39: Усадьба Барышникова (новый, папка myasnitskaya_42)
  "obj-39": [],

  // obj-40: Дом Игумнова (новый, папка igumnova_43)
  "obj-40": [
    "d98f6dbcfd760ccd2dd8ac371f1df225 (1).webp",
    "igumn1.jpg",
    "moskva-ul-bolshaya-yakimanka-43-dom-igumnova-na-yakimanke-0006440204-preview.jpg",
    "orig.jfif",
    "qM_xxveYeqWX_g2g60qKUOYbiQr3vIU4mlN-l5nTIxRPKrBicrw_mvLvOMl-iZcv_iPYsMeBrGreUh620PFWq7juYCbDeD6g87p5IG4O-4Qy-OrJJPuWKtkFrRU7tWF2HIsx5mfpO4tWyx5uf6jRq-nWDxVTQLsvm5Ip1uSBwoms6dSWZOp5BRQfy3CKe52Bl6vrepV6NTuKRK4nKNcB.jfif",
    "XXL_height (1).jfif",
    "XXL_height.jfif",
    "Усадьба_купца_Игумнова_на_Большой_Якиманке_2024_02.png"
  ],

  // obj-41: Дом Пашкова (новый, папка pashkova_3)
  "obj-41": [
    "346935699751343.jpeg",
    "346935702985542.jpeg",
    "4676680_800.jpg",
    "500px-Москва-Дом-Пашкова.jpg",
    "f550x450px-Pashkov_dom_7.webp",
    "gl(235151).webp",
    "Pashkov_house_20190501.jpg",
    "photo2jpg.jpg",
    "XXL_height.jfif",
    "Дом-Пашкова,Москва_-_panoramio.jpg",
    "загруженное.webp"
  ],

  // obj-42: Доходный дом И.П. Исакова (новый, папка prechistenka_28)
  "obj-42": [
    "06d3dd378.jpg",
    "10.jpeg",
    "347515634287721.jpeg",
    "92B882B0BBB8B9D0D0D1D0D0%BD1992.jpeg",
    "b2da38cs-960.jpg",
    "i.jfif",
    "Iaskov_House_view.jpg",
    "Isakov_House_be_Kekushev.jpg",
    "L.jfif",
    "XXL_height (1).jfif",
    "XXL_height.jfif",
    "Доходный_дом_Исакова_Пречистенка_28.jpg"
  ],

  // obj-43: Дом-мастерская архитектора Мельникова (новый, папка melnikova_10)
  "obj-43": [
    "010279.jpg",
    "1213243_35650119.jpeg",
    "310776.jpg",
    "bcc34bc8b4deb10d4fe5924f20cc4019.webp",
    "d6opem4yeb4s4ksokcsc4wkww.jpg",
    "i.jfif",
    "Melnikov_House,_May_2021.jpg",
    "w5.jpg",
    "Северо-западный_фасад_Дома_Мельникова.jpg"
  ]
};

/**
 * Вспомогательная функция для получения путей (используется в PassportPanel).
 * Не экспортируется как основная — вся логика должна идти через PHOTO_REGISTRY + photosFolder.
 */
export const getPhotoPathsForObject = (objectId: string, photosFolder: string): string[] => {
  const fileNames = PHOTO_REGISTRY[objectId] || [];
  if (!fileNames.length || !photosFolder) return [];
  return fileNames.map(name => `/photos/${photosFolder}/${name}`);
};

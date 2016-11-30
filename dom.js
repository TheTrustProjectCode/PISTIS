const config = {
    body: ".story-body",
    images: ".story-body .image-and-copyright-container",
    inta: ".story-body__link",
    exta: ".story-body__link-external",
    text: ".story p"
};

let results = {
    agencies: [],
    imageList: [],
    intLinks: [],
    extLinks: []
};

let imageList = [];

let domImages = document.querySelectorAll(config.images);

domImages.forEach((img) => {

    let obj = {};

    if (img && img.children && img.children[2] && img.children[2].innerText) {
        obj.copyright = img.children[2].innerText;
    }

    if (img.children[0].getAttribute('datasrc')) {
        obj.src = img.children[0].getAttribute('datasrc');
    }

    if (img.children[0].alt) {
        obj.alt = img.children[0].alt;
    }

    results.imageList.push(obj);
});

let tineye;

var getImages = new XMLHttpRequest();
getImages.open("POST", 'https://trusthack.jexworld.co.uk/check.php');
getImages.onreadystatechange = function() {
    if (getImages.readyState === 4) {
        tineye = JSON.parse(getImages.response);
        if (tineye && tineye.length)
            tineye.forEach((row) => {
                let obj = {
                    copyright: row.copyright,
                    src: row.src,
                    alt: row.alt,
                    number: row.number,
                    result: row.result,
                    firstcrawl: row.firstcrawl
                };
                results.imageList.push(obj)
            });
        console.log(results.imageList);
    }
};
getImages.send(JSON.stringify(results.imageList));

let domLinks = document.querySelectorAll(config.inta);
domLinks.forEach((row) => {
    results.intLinks.push({ href: row.getAttribute('href'), text: row.innerText });
});

let extLinks = document.querySelectorAll(config.exta);
extLinks.forEach((row) => {
    results.extLinks.push({ href: row.getAttribute('href'), text: row.innerText });
});

let quotes = document.querySelectorAll(config.exta);
extLinks.forEach((row) => {
    results.extLinks.push({ href: row.getAttribute('href'), text: row.innerText });
});


let textBody = document.querySelectorAll(config.text);
textBody.forEach((row) => {
    search = ['AP', 'Reuters', 'AFP', 'PA', 'EFE', 'Xinhua', 'IRNA', 'PTI', 'KCNA', 'DPA', 'TASS'];
    search.forEach((agent) => {
        let splits = row.innerHTML.split(' ' + agent + ' ');
        if (splits.length > 1) {
            results.agencies.push({ agent: agent, qty: splits.length });
        }
    });
});

var transparancy = document.createElement('div');
transparancy.style.height = 'auto';
transparancy.style.width = '100%';
transparancy.style.backgroundColor = 'white';

var body = document.getElementsByTagName('body')[0];

const updateDom = () => {

    //EXTERNAL LINKS
    document.getElementById('ext-links')
        .value = results.extLinks.length;

    let extLinkListDom = document.createElement('div');
    results.extLinks.forEach((row, i) => {

        let href = document.createElement('input');
        let hrefLabel = document.createElement('label');
        href.value = row.href;
        href.setAttribute('id', 'ext-href-src-' + i);
        hrefLabel.setAttribute('for', 'ext-href-src-' + i);
        hrefLabel.innerText = 'Source';
        href.value = row.href;
        extLinkListDom.append(hrefLabel);
        extLinkListDom.append(href);

        let text = document.createElement('input');
        let textLabel = document.createElement('label');
        text.setAttribute('id', 'ext-text-src-' + i);
        textLabel.setAttribute('for', 'ext-text-src' + i);
        textLabel.innerText = 'Description';
        text.value = row.text;
        extLinkListDom.append(textLabel);
        extLinkListDom.append(text);

    });
    document.getElementById('ext-links-list')
        .appendChild(extLinkListDom);

    let extLinksButton = document.getElementById('ext-links-button');
    extLinksButton.addEventListener('click', () => {
        let extLinksList = document.getElementById('ext-links-list');
        if (extLinksList.style.display === 'block') {
            extLinksList.style.display = 'none';
            extLinksButton.style.transform = 'rotate(0deg)';
        } else {
            extLinksList.style.display = 'block';
            extLinksButton.style.transform = 'rotate(90deg)';
        }
    });

    //INTERNAL LINKS
    document.getElementById('int-links')
        .value = results.intLinks.length;

    let intLinkListDom = document.createElement('div');
    results.intLinks.forEach((row, i) => {

        let href = document.createElement('input');
        let hrefLabel = document.createElement('label');
        href.setAttribute('id', 'href-src-' + i);
        hrefLabel.setAttribute('for', 'href-src' + i);
        hrefLabel.innerText = 'Source';
        href.value = row.href;
        intLinkListDom.append(hrefLabel);
        intLinkListDom.append(href);

        let text = document.createElement('input');
        let textLabel = document.createElement('label');
        text.setAttribute('id', 'href-src-' + i);
        textLabel.setAttribute('for', 'href-src' + i);
        textLabel.innerText = 'Description';
        text.value = row.text;
        intLinkListDom.append(textLabel);
        intLinkListDom.append(text);

    });

    document.getElementById('int-links-list')
        .appendChild(intLinkListDom);

    let linksButton = document.getElementById('int-links-button');
    linksButton.addEventListener('click', () => {
        let intLinksList = document.getElementById('int-links-list');
        if (intLinksList.style.display === 'block') {
            intLinksList.style.display = 'none';
            linksButton.style.transform = 'rotate(0deg)';
        } else {
            intLinksList.style.display = 'block';
            linksButton.style.transform = 'rotate(90deg)';
        }
    });


    //IMAGES
    document.getElementById('images')
        .value = results.imageList.length;

    let imageListDom = document.createElement('div');
    results.imageList.forEach((row, i) => {
        let cont = document.createElement('div');
        cont.setAttribute('class', 'list');

        let inputSrc = document.createElement('input');
        let inputSrcLabel = document.createElement('label');
        inputSrc.setAttribute('id', 'image-src-' + i);
        inputSrcLabel.setAttribute('for', 'image-src' + i);
        inputSrcLabel.innerText = 'Source Image';
        if (row.src) { inputSrc.value = row.src; }
        cont.append(inputSrcLabel);
        cont.append(inputSrc);

        let inputAlt = document.createElement('input');
        let inputAltLabel = document.createElement('label');
        inputAlt.setAttribute('id', 'image-alt' + i);
        inputAltLabel.setAttribute('for', 'image-alt' + i);
        inputAltLabel.innerText = 'Description';
        if (row.alt) { inputAlt.value = row.alt; }
        cont.append(inputAltLabel);
        cont.append(inputAlt);


        let inputCR = document.createElement('input');
        let inputCRLabel = document.createElement('label');
        inputCR.setAttribute('id', 'image-cr' + i);
        inputCRLabel.setAttribute('for', 'image-cr' + i);
        inputCRLabel.innerText = 'Copyright';
        if (row.copyright) { inputCR.value = row.copyright; }
        cont.append(inputCRLabel);
        cont.append(inputCR);


        let inputResult = document.createElement('input');
        let inputResultLabel = document.createElement('label');
        inputResult.setAttribute('id', 'image-result' + i);
        inputResultLabel.setAttribute('for', 'image-result' + i);
        inputResultLabel.innerText = 'Versions found';
        if (row.number) { inputResult.value = row.number; }
        cont.append(inputResultLabel);
        cont.append(inputResult);


        let inputFirstCrawl = document.createElement('input');
        let inputFirstCrawlLabel = document.createElement('label');
        inputFirstCrawl.setAttribute('id', 'image-first' + i);
        inputFirstCrawlLabel.setAttribute('for', 'image-first' + i);
        inputFirstCrawlLabel.innerText = 'First Seen';
        if (row.firstcrawl) { inputFirstCrawl.value = row.firstcrawl; }
        cont.append(inputFirstCrawlLabel);
        cont.append(inputFirstCrawl);


        imageListDom.append(cont);


        let score = results.agencies.length * 10;
        score += results.imageList.length * 10;
        score += results.intLinks.length * 2;
        score += results.extLinks.length * 8;

        if (score > 100) {
            score = 100;
        }

        document.getElementById('trust-score').innerText = score;

        let schema = {
            "@context": "http://schema.org",
            "@type": "Article",
            "url": "http://www.bbc.co.uk/news/world-us-canada-38155141",
            "publisher": {
                "@type": "Organization",
                "name": "BBC News",
                "logo": "http://www.bbc.co.uk/news/special/2015/newsspec_10857/bbc_news_logo.png?cb=1"
            },
            "headline": "Trump says he will 'leave business' to focus on presidency",
            "mainEntityOfPage": "http://www.bbc.co.uk/news/world-us-canada-38155141",
            "articleBody": "Donald Trump announces he is leaving \"business in total\" to focus on the presidency.",
            "image": results.imageList,
            "Agencies": [],
            "Media": [],
            "AuthorExpertise": [],
            "DataAndResearch": [],
            "OriginalReporting": true,
            "Quotes": [],
            "FactCheckDone": true,
            "DocumentationAvailable": [],
            "UGCVerified": true,
            "Sponsored": [],
            "ExternalLinks": results.extLinks,
            "InternalLinks": results.intLinks,
            "datePublished": "2016-11-30T13:15:14+00:00"
        }


        let submit = document.getElementById('submit-trust');
        submit.addEventListener('click', () => {
            alert(JSON.stringify(schema));
        });


    });

    document.getElementById('image-list')
        .appendChild(imageListDom);

    let imagesButton = document.getElementById('images-button');
    imagesButton.addEventListener('click', () => {
        let imageList = document.getElementById('image-list');
        if (imageList.style.display === 'block') {
            imageList.style.display = 'none';
            imagesButton.style.transform = 'rotate(0deg)';
        } else {
            imageList.style.display = 'block';
            imagesButton.style.transform = 'rotate(90deg)';
        }
    });

    let submit = document.getElementById('images-button');
    submit.addEventListener('click', () => {
        console.log(JSON.stringify(results));
    });
};


var xhr = new XMLHttpRequest();
xhr.open("GET", chrome.extension.getURL('template.html'));
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        transparancy.innerHTML = xhr.response;
        body.insertBefore(transparancy, body.children[0]);
        updateDom();
    }
};
xhr.send();

//event listeners
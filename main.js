$(() => {

    let selectedCurrencySymbols = [];
    let sixthBtnPressed;
    let chart;

    handleHome();

    $("a.nav-link").on("click", function () {

        $("a.nav-link").removeClass("active");
        $(this).addClass("active");

        const sectionId = $(this).attr("data-section");
        $("section").hide();
        $("#" + sectionId).show();

    });

    $("a.footer-nav-link").on("click", function () {
        $("a.nav-link").removeClass("active");
        $(this).addClass("active");
        const sectionId = $(this).attr("data-section");
        $("section").hide();
        $("#" + sectionId).show();
    });

    $("#coinsContainer").on("click", ".more-info", async function () {
        const coinId = $(this).attr("id").substring(7);
        showProgressbar();
        await handleMoreInfo(coinId);
    });

    $("#homeLink").on("click", async () => await handleHome());
    $("#homeLinkFooter").on("click", async () => await handleHome());
    $("#reportsLink").on("click", displayReportsSection);
    $("#reportsLinkFooter").on("click", displayReportsSection);
    $("#aboutLink").on("click", displayAboutSection);
    $("#aboutLinkFooter").on("click", displayAboutSection);

    function displayReportsSection() {
        $(".topParallax").css({ display: "none" });
        const reportsSection = $("#reportsSection");
        reportsSection.html(`
        <h2>Reports</h2>
        <div id="chartContainer" style="height: 300px; width: 100%;"></div>
        <div class="t-a-start">
        <p>The real-time graph provides a comprehensive overview of your selected cryptocurrencies, offering insights into their current status and trends. Each currency that is toggled ON corresponds to a line on the graph, enabling you to track multiple currencies simultaneously. It's important to note that the graph and accompanying report are constantly updated with the latest data, ensuring that you have access to the most accurate information available.</p>
        <span class="make-bold">Please Note:</span>
        <ul>
            <li>The graph is updated every 2 seconds, providing you with real-time data to make informed decisions.</li>
            <li>To customize the currencies displayed on the graph, simply navigate to the main screen and select your preferred currencies. The changes will be reflected instantly, allowing you to focus on the currencies that matter most to you and your investments.</li>
        </ul>
        <p>Explore the dynamic capabilities of our real-time reports panel and stay ahead of the cryptocurrency market trends with up-to-date information at your fingertips.</p>
        </div>
         `);
        makeChart();
        reportsSection.show();
        $("section").not(reportsSection).hide();
        $(".nav-link").removeClass("active");
        $("#reportsLink").addClass("active");
    };

    function displayAboutSection() {
        $(".topParallax").css({ display: "none" });
        const aboutSection = $("#aboutSection");
        const personalDetails = `
        <h3>Personal Details</h3>
        <p>Ruti Weingarten is a passionate student of Full Stack Web Development. At 20 years old, she enthusiastically immerses herself in the intricate world of technology, creating impactful web solutions while also balancing her studies in mathematics. Currently residing in Beit Shemesh, Israel, she finds constant inspiration in the dynamic nature of coding and the endless possibilities it offers. Ruti's interest in cryptocurrency and web development has led her to innovative projects like 'Cryptonite', where she combines her coding skills with creativity to build engaging platforms. Beyond coding, she immerses herself in tech communities, stays updated with industry trends, and pushes the boundaries of what's possible in web development. Join Ruti as she explores the ever-evolving landscape of technology and makes meaningful contributions to the digital world!</p>
    `;
        const projectDescription = `
        <h3>Project Description</h3>
        <p>Cryptonite is a modern platform dedicated to tracking and analyzing cryptocurrencies. Designed to cater to both novice enthusiasts and seasoned investors, Cryptonite offers a comprehensive suite of tools and features to navigate the dynamic world of digital assets with confidence.</p>

        <h5>Features Overview:</h5>
        
        <ol class="t-a-start">
        <li><span class="ol-item">Real-Time Data:</span> Stay updated with live cryptocurrency prices, market trends, and historical data. Our platform leverages robust APIs to provide accurate and up-to-date information at your fingertips.</li>
        <li><span class="ol-item">Portfolio Management:</span> Seamlessly manage your crypto portfolio with intuitive tracking and performance analysis tools. Monitor your investments, track profits/losses, and make informed decisions with ease.</li>
        <li><span class="ol-item">Live Reports:</span> Dive deep into insightful live reports, charts, and graphs. Gain valuable insights into market trends, trading volumes, and price movements to refine your investment strategies.</li>
        <li><span class="ol-item">Advanced Analytics:</span> Leverage advanced analytics tools to analyze coin performance, correlations, and risk factors. Utilize technical indicators and chart patterns to make data-driven trading decisions.</li>
        <li><span class="ol-item">Educational Resources:</span> Access a wealth of educational resources, guides, and tutorials. Whether you're a beginner or an experienced trader, expand your knowledge and stay ahead in the crypto landscape.</li>
        </ol>

        <h5>Our Vision:</h5>
        
        <p>At Cryptonite, we envision a future where everyone can confidently navigate the complexities of cryptocurrencies. Whether you're seeking financial independence, exploring innovative technologies, or diversifying your investment portfolio, Cryptonite empowers you to thrive in the digital economy.</p>
        
        <h5>Why Choose Cryptonite?</h5>
        
        <p>Cryptonite boasts a user-friendly interface crafted with an intuitive design and seamless navigation, ensuring a smooth and engaging user experience. Our platform is designed to be accessible and easy to use, allowing users to effortlessly navigate through various sections and access essential information. We prioritize user feedback and continuously strive for innovation, regularly rolling out updates and feature improvements to meet the evolving needs of our community. By joining Cryptonite today, you not only gain access to powerful cryptocurrency tracking and analysis tools but also become part of a vibrant community dedicated to exploring and navigating the exciting world of cryptocurrencies. Embark on a rewarding journey with Cryptonite and unlock new possibilities in the digital asset landscape!</p>
    `;
        aboutSection.html(`
        <h2>About</h2>
        ${personalDetails}
        <img src="./assets/images/about.jpg" alt="my-image" class="about-image">
        ${projectDescription}
        `);
        aboutSection.show();
        $("section").not(aboutSection).hide();
        $(".nav-link").removeClass("active");
        $("#aboutLink").addClass("active");
    };

    async function handleHome() {
        // const coins = await getJson("https://api.coingecko.com/api/v3/coins/list");
        const coins = await getJson("coins.json");
        displayCoins(coins);

        $(".topParallax").css({ display: "block" });

        const homeSection = $("#homeSection");
        homeSection.show();
        $("section").not(homeSection).hide();
        $(".nav-link").removeClass("active");
        $("#homeLink").addClass("active");
    }

    function displayCoins(coins) {
        // coins = coins.filter(c => c.symbol.length <= 3);
        let html = "";
        // for (let i = 0; i < coins.length; i++) {
        for (let i = 0; i < 20; i++) {
            html += `
            <div class="card" id="card_${coins[i].id}" style="width: 18rem; height: 20rem; overflow: auto;">
                <div class="card-body">
                    <h5 class="card-symbol">${coins[i].symbol}</h5>
                    <p class="card-name">${coins[i].name}</p>
                    
                    <button id="button_${coins[i].id}" class="btn btn-primary more-info" data-bs-toggle="collapse" data-bs-target="#collapse_${coins[i].id}">
                    More Info
                    </button>
                    <div style="min-height: 120px;">
                    <div class="collapse collapse-horizontal" id="collapse_${coins[i].id}">
                    <div class="card card-body">
                    <div id="progressbar"><div class="progress-label">Loading...</div></div>
                    </div>
                    </div>
                    </div>
                    <label class="switch card-switch"><input type="checkbox" id="toggle_${coins[i].symbol}"><span class="slider round"></span></label>

                </div>
            </div>
            `;
        }
        $("#coinsContainer").on("click", ".card-switch input[type='checkbox']", checkTogglesCount);
        $("#coinsContainer").html(html);
    }

    function checkTogglesCount(event) {
        const toggleBtn = $(event.target);
        const btnIdStr = toggleBtn[0].id;
        const btnSymbol = btnIdStr.substring(7);
        if (!toggleBtn.prop("checked")) {
            const index = selectedCurrencySymbols.indexOf(btnSymbol);
            if (index !== -1) {
                selectedCurrencySymbols.splice(index, 1);
            }
            // console.log(selectedCurrencySymbols);
        }
        if (selectedCurrencySymbols.length < 5) {
            if (toggleBtn.prop("checked")) {
                selectedCurrencySymbols.push(btnSymbol);
                // console.log(selectedCurrencySymbols);
            }
        } else {
            $(`#${btnIdStr}`).prop('checked', false);
            sixthBtnPressed = $(`#${btnIdStr}`);
            displayModal();
        }
    }

    function displayModal() {
        modal = document.createElement('div');
        modal.id = 'customModal';
        modal.classList.add('modal');
        modal.style.display = 'none';

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modal.appendChild(modalContent);

        modalContent.innerHTML = `
            <p>You have reached the maximum limit of 5 coins.
            Please select the currency you want to remove:</p>
            ${selectedCurrencySymbols.map(symbol => `
                <div class="modal-row">
                    <label>${symbol}</label>
                    <label class="modal-switch switch">
                        <input type="checkbox" id="modal_toggle_${symbol}" class="toggle-button" data-symbol="${symbol}" checked>
                        <span class="slider round"></span>
                    </label>
                </div>
            `).join('')
            }
            <div class="modalBtns">
                <button id="cancelButton" class="btn btn-outline-danger">Cancel</button>
            </div>
        `;
        selectedCurrencySymbols.forEach(symbol => {
            const modalInput = modal.querySelector(`#modal_toggle_${symbol}`);
            modalInput.addEventListener('click', updateCardsFromModal);
        });

        document.body.appendChild(modal);

        const cancelButton = modal.querySelector('#cancelButton');
        cancelButton.addEventListener('click', function () {
            modal.style.display = 'none';
        });


        modal.style.display = 'block';
    }

    function updateCardsFromModal(event) {
        modal.style.display = 'none';
        const toggleBtnOff = event.target.dataset.symbol;
        const index = selectedCurrencySymbols.indexOf(toggleBtnOff);
        selectedCurrencySymbols.splice(index, 1);
        const homeBtn = $(`#toggle_${toggleBtnOff}`);
        homeBtn.prop('checked', false);
        sixthBtnPressed.prop('checked', true);
        const sixthBtnId = sixthBtnPressed[0].id;
        const sixthBtnSymbol = sixthBtnId.substring(7);
        selectedCurrencySymbols.push(sixthBtnSymbol);
        // console.log(selectedCurrencySymbols);
    }

    async function handleMoreInfo(coinId) {
        const cacheKey = `coin_info_${coinId}`;
        const cachedInfo = sessionStorage.getItem(cacheKey);
        if (cachedInfo) {
            const { timestamp, data } = JSON.parse(cachedInfo);
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - timestamp;
            if (timeDifference > 120000) {
                sessionStorage.removeItem(cacheKey);
            } else {
                displayCachedInfo(data);
                return;
            }
        }

        const coin = await getJson(`https://api.coingecko.com/api/v3/coins/${coinId}`);
        saveToSessionStorage(cacheKey, coin);
        displayCoinInfo(coin);
    }

    async function getJson(url) {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }

    function displayCoinInfo(coin) {
        const imageSource = coin.image.thumb;
        const usd = coin.market_data.current_price.usd;
        const eur = coin.market_data.current_price.eur;
        const ils = coin.market_data.current_price.ils;
        const moreInfo = `
            <img src="${imageSource}"> <br>
            USD: ${usd}$ <br>
            EUR: ${eur}Є <br>
            ILS: ${ils}₪
        `;
        $(`#collapse_${coin.id}`).children().html(moreInfo);
    }

    function saveToSessionStorage(key, data) {
        const currentTime = new Date().getTime();
        const dataToStore = {
            timestamp: currentTime,
            data: data
        };
        sessionStorage.setItem(key, JSON.stringify(dataToStore));
    }

    function displayCachedInfo(data) {
        displayCoinInfo(data);
    }

    function showProgressbar() {
        const progressbar = $("#progressbar"),
            progressLabel = $(".progress-label");

        progressbar.progressbar({
            value: false,
            change: function () {
                progressLabel.text(progressbar.progressbar("value") + "%");
            },
            complete: function () {
                progressLabel.text("Complete!");
            }
        });

        function fetchDataAndCache() {
            let val = 0;
            progressbar.progressbar("value", val);
            progressLabel.text(val + "%");

            const interval = setInterval(function () {
                val += 20;
                progressbar.progressbar("value", val);
                progressLabel.text(val + "%");

                if (val >= 100) {
                    clearInterval(interval);
                    progressLabel.text("Complete!");
                }
            }, 100);
        }
        fetchDataAndCache();
    };

    $("#searchBtn").on('click', handleSearch);
    $("#allBtn").on('click', clearSearch);

    function handleSearch() {
        const topParallax = document.querySelector('.topParallax');
        const bottomParallax = document.querySelector('.bottomParallax');
        topParallax.style.display = 'none';
        bottomParallax.style.display = 'none';

        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value.trim().toLowerCase();

        const allCards = document.querySelectorAll('.card');
        allCards.forEach(function (card) {
            const cardSymbol = card.querySelector('.card-symbol');
            if (cardSymbol) {
                const cardText = cardSymbol.textContent.trim().toLowerCase();
                if (cardText === searchTerm) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
        searchInput.value = "";
    }

    function clearSearch() {
        const topParallax = document.querySelector('.topParallax');
        const bottomParallax = document.querySelector('.bottomParallax');
        topParallax.style.display = 'block';
        bottomParallax.style.display = 'block';

        const allCards = document.querySelectorAll('.card');
        allCards.forEach(function (card) {
            card.style.display = 'block';
        });
    }

    async function fetchCurrentCurrencyValue(symbol) {
        try {
            const d = new Date();
            const n = d.toLocaleTimeString();
            console.log(n);
            const upperSymbol = symbol.toUpperCase();
            const currencyJson = await getJson(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${upperSymbol}&tsyms=USD`);
            if (currencyJson && currencyJson[upperSymbol] && currencyJson[upperSymbol].USD) {
                const currencyValue = currencyJson[upperSymbol].USD;
                const symbolObject = chart.options.data.find(obj => obj.name === symbol);
                if (symbolObject) {
                    symbolObject.dataPoints.push({ x: n, y: currencyValue });
                    chart.render();
                }
            } else {
                console.error('Invalid currency data received:', currencyJson);
            }
        } catch (error) {
            console.error('Error fetching currency data:', error);
        }
    }

    function makeChart() {
        // console.log('Selected Currency Symbols:', selectedCurrencySymbols);
        const options = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Real time currency status"
            },
            subtitles: [{
                text: "Click Legend to Hide or Unhide Data Series"
            }],
            axisX: {
                title: "Time"
            },
            axisY: {
                title: "Currency Value",
                titleFontColor: "#4F81BC",
                lineColor: "#4F81BC",
                labelFontColor: "#4F81BC",
                tickColor: "#4F81BC"
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                itemclick: toggleDataSeries
            },
            data: []
        };

        selectedCurrencySymbols.forEach(symbol => {
            options.data.push({
                type: "spline",
                name: symbol,
                showInLegend: true,
                xValueFormatString: "HH:MM:SS",
                yValueFormatString: "#,### $",
                dataPoints: []
            });
            setInterval(() => fetchCurrentCurrencyValue(symbol), 2000);
        });

        chart = new CanvasJS.Chart("chartContainer", options);
        chart.render();

        function toggleDataSeries(e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else {
                e.dataSeries.visible = true;
            }
            e.chart.render();
        }
    }
});
class SimpleClockCard extends HTMLElement {

	set hass(hass) {

		if (!this.content) {
			var config = this.config;
			const card = document.createElement('HA-card');
			this.content = document.createElement('div');
			this.content.style.paddingLeft = this.config.paddingLeft_size ? this.config.paddingLeft_size : '0px';
			this.content.style.paddingRight = this.config.paddingRight_size ? this.config.paddingRight_size : '0px';
			this.content.style.paddingTop = this.config.paddingTop_size ? this.config.paddingTop_size : '60px';
			this.content.style.paddingBottom = this.config.paddingBottom_size ? this.config.paddingBottom_size : '60px';
			this.content.style.fontSize = this.config.font_size ? this.config.font_size : '4rem' ;
			this.style.textAlign = 'center';
			this.content.style.display = 'inline-block';
			card.appendChild(this.content);
			this.appendChild(card);
			var content = this.content;
			startTime();
			setInterval(startTime, 1000);
	
			function addZero(i){
				if (i < 10){
					i = "0" + i;
				}
				return i;
			}

			function startTime() {
				var today = new Date(),
				h = today.getHours(),
				m = today.getMinutes(),
				s = today.getSeconds(),
				p = ( h < 12 ) ? "AM" : "PM";
				m = addZero(m);
				s = addZero(s);

				let  use_military = config.use_military !== undefined ? config.use_military : true;
				let  hide_seconds = config.hide_seconds !== undefined ? config.hide_seconds : false;
				let  lead_zero = config.lead_zero !== undefined ? config.lead_zero : false;

				let time_str = (use_military ? (lead_zero ? addZero(h) : h) : ((h + 11) % 12) + 1) +
				    '<span class="colon">:</span>' +
				    m +
				    (hide_seconds ? "" : '<span class="colon">:</span>' + s) +
				    (use_military ? " " : " " + p);
				content.innerHTML = time_str;
			}
		}
	}

    setConfig(config) {
        this.config = config;
    }

    getCardSize() {
        return 1;
    }
}

customElements.define('simple-clock-card', SimpleClockCard);

let style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeInOut {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .colon {
        animation: fadeInOut 2s infinite;
    }
`;
document.head.appendChild(style);

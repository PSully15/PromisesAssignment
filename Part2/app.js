$(function () {
	let baseURl = 'https://deckofcardsapi.com/api/deck';

	$.getJSON(`${baseURl}/new/draw/`).then((data) => {
		let { suit, value } = data.cards[0];
		console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
	});

	let firstCard = null;
	$.getJSON(`${baseURl}/new/draw/`)
		.then((data) => {
			firstCard = data.cards[0];
			let deckId = data.deck_id;
			return $.getJSON(`${baseURl}/${deckId}/draw/`);
		})
		.then((data) => {
			let secondCard = data.cards[0];
			[firstCard, secondCard].forEach((card) => {
				console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
			});
		});

	let deckID = null;
	let $btn = $('button');
	let $cardArea = $('#card-area');

	$.getJSON(`${baseURl}/new/shuffle/`).then((data) => {
		deckID = data.deck_id;
		$btn.show();
	});

	$btn.on('click', function () {
		$.getJSON(`${baseURl}/${deckID}/draw/`).then((data) => {
			let cardSrc = data.cards[0].image;
			let angle = Math.random() * 90 - 45;
			let randomX = Math.random() * 40 - 20;
			let randomY = Math.random() * 40 - 20;
			$cardArea.append(
				$('<img>', {
					src: cardSrc,
					css: {
						transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
					},
				})
			);
			if (data.remaining === 0) $btn.remove();
		});
	});
});

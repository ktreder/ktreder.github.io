/* main.js
 * Eli Shayer
 * ----------
 * Kathryn Treder's website main Javascript file. Currently empty.
 */

(function(window, document, undefined) {
	sections = {
		intro:  {
			template: [
				'<div class="col-sm-4 col-xs-6 col-sm-offset-0 col-xs-offset-3">',
					'<img src="{{ image.src }}" alt="{{ image.alt }}" id="{{ image.id }}"/>',
				'</div>',
				'<div class="col-sm-8 col-xs-12">',
					'<h1>{{ content.title }}</h1>',
					'<h3>{{ content.subtitle }}</h3>',
					'{{#each content.text}}',
					'<p>{{{ this }}}</p>',
					'{{/each}}',
				'</div>',
			].join(''),
			data    : {
				image: { src: './images/kathryn-treder.jpg', alt: 'Kathryn Treder', id : 'portrait' },
				content: {
					title   : 'Kathryn Treder',
					subtitle: 'Stanford University class of 2018',
					text    : [
						'Hi! I am a sophomore at Stanford University from Anchorage, Alaska. My major is Political Science with a primary track of Elections, Representation, & Governance and a secondary track of Data Science.'
					]
				}
			}
		},
		tabs: {
			template: [
				'<div class="col-xs-12">',
					'<ul class="nav nav-tabs nav-justified">',
						'{{#each this}}',
						'<li role="presentation" id="{{ name }}-tab">',
							'<a href="#" tab="{{ name }}">{{ name }} <i class="fa fa-{{icon}}"></i></a>',
						'</li>',
						'{{/each}}',
					'<ul>',
				'</div>'
			].join(''),
			data    : [
				{ name: 'school', icon: 'graduation-cap' },
				{ name: 'awards', icon: 'trophy' },
			]
		},
		school: {
			template: [
				'<div id="schools">',
					'{{#each this}}',
					'<div class="col-xs-12 col-md-6">',
						'<h3>{{ name }}</h3>',
						'<h4>Class of {{ grad }}{{#if note}} &ndash; {{note}}{{/if}}</h4>',
						'<div class="row">',
							'<div class="col-xs-6 col-sm-5 classes">',
								'<p class="header">Classes</p>',
								'<ul class="no-pad-ul">',
									'{{#each classes}}',
									'<li><a href="#" data-toggle="tooltip" c-title="{{ title }}" c-time="{{ time }}">{{ name }} <i class="fa fa-caret-right"></i></a></li>',
									'{{/each}}',
								'</ul>',
							'</div>',
							'<div class="col-xs-6 col-sm-7 activities">',
								'<p class="header">Activities</p>',
								'<ul class="no-pad-ul">',
									'{{#each activities}}',
									'<li>',
										'{{#if details.length}}',
											'<a href="#" data-toggle="tooltip" details="{{ details }}"><i class="fa fa-caret-left"></i> {{ name }}</a>',
										'{{else}}',
											'{{ name }}',
										'{{/if}}',
									'</li>',
									'{{/each}}',
								'</ul>',
							'</div>',
						'</div>',
					'</div>',
					'{{/each}}',
				'</div>',
			].join(''),
			data: [
				{
					name: 'Stanford University',
					grad: '2018',
					classes: [
						{ name: 'Class 1', title: 'Title 1', time: 'Freshman Autumn' },
						{ name: 'Class 2', title: 'Title 2', time: 'Freshman Winter' },
						{ name: 'Class 3', title: 'Title 3', time: 'Freshman Spring' },
					],
					activities: [
						{ name: "Stanford Women's Rugby", details: [ 'Financial Officer, 2015-2016' ] },
						{ name: 'Stanford Democrats', details: [ 'Membership & Outreach Associate, 2015-2016' ] },
						{ name: 'Stanford American Indian Organization', details: [ 'Social Media Chair, 2015-2016' ] },
						{ name: 'Stanford for Bernie', details: [ 'Events Planning Committee, 2015-2016' ] },
						{ name: 'Stanford Mental Health Outreach', details: [] },
						{ name: 'Alaskan Native Student Association', details: [ 'Co-President, 2015-2016' ] },
						{ name: 'Dorm Government', details: [ 'Senate Representative, 2015' ] }
					]
				},
				{
					name: 'West Anchorage High School',
					grad: '2014',
					classes: [
						{ name: 'Class 1', time: 'Freshman' },
						{ name: 'Class 2', time: 'Sophomore' },
						{ name: 'Class 3', time: 'Junior' },
						{ name: 'Class 4', time: 'Senior' },
					],
					activities: [
						{ name: 'Wrestling', details: [ 'Captain, 2013 & 2014', 'Varsity Letter, Years?', "Women's State Title, 2013", "Women's State Title, 2014" ] },
						{ name: 'Track and Field', details: [ 'Captain, 2013 & 2014', 'Varsity Letter, Years?', 'State Qualifier, 2011-2014', 'regions placer', 'state placer' ] },
						{ name: 'National Honor Society', details: [] },
						{ name: 'Amnesty International', details: [ 'Co-President, 2013 & 2014' ] },
					]
				}
			]
		},
		awards: {
			template: [
				'<div class="col-xs-12" id="awards">',
					'{{#each this}}',
						'<h3>{{ name }}</h3>',
						'<h4>{{ date }}</h4>',
						'<p>{{ description }}</p>',
					'{{/each}}',
				'</div>',
			].join(''),
			data: [
				{ name: 'QuestBridge Scholar', description: '[description goes here]', date: '2014' },
				{ name: 'QuestBridge Finalist', description: '[description goes here]', date: '2013' },
				{ name: 'AP Scholar with Distinction', description: '[description goes here]', date: '2013' },
			]
		},
	};

	// ------------------------------------------ DATA PROCESSING
	// for each activity in each school
	$.each(sections.school.data, function() {
		$.each(this.activities, function() {
			// join into a string delimited by a pipe character
			this.details = this.details.join('|');
		});
	});

	// ------------------------------------------ HANDLEBARS COMPILATION AND RENDERING
	// For each section, compile the Handlebars template and render it with the
	// associated data. Then place the resulting html in the DOM
	for (section in sections) {
		// get the template and data
		var template = sections[section].template;
		var data = sections[section].data;

		// compile the template, pass in the data, and render to the DOM
		$('<div>').addClass('row')
				  .attr('id', section)
				  .html(Handlebars.compile(template)(data))
				  .appendTo($('.container'));
	}

	// ------------------------------------------ TAB LISTENERS
	// general function to set tab listeners for any set of tabs
	function setTabListener(tabs, getName, selector, initial) {
		// toggle a single tab to active and all others to hidden
		function setActive() {
			$.each(tabs, function() {
				// get the name and determine whether it is active
				var name = getName(this);
				var isActive = name === currTab;

				// set the active tab and display only the active content
				$('#' + name + '-tab').toggleClass('active', isActive);
				$('#' + name).toggle(isActive);
			});
		}

		// initialize the active tab
		setActive(initial);

		// event listener for user seletion of active tab
		$(selector).click(function() {
			var selection = $(this).attr('tab');
			if (selection) {
				currTab = selection;
				setActive();
			}
		})
	}

	// keep track of the current tabs
	var currTab = 'school';

	// set the tab listener for the main set of tabs
	setTabListener(sections.tabs.data, function(tab) { return tab.name; },
		'#tabs>div>ul>li>a', currTab);

	// ------------------------------------------ TOOLTIPS
	// activates all tooltips that are children of parent, sets title with titleFn
	function activateTooltips(parent, placement, titleFn) {
		$(parent + ' [data-toggle="tooltip"]').tooltip({
			container: 'body', placement: placement, html: true, title: titleFn
		});
	}

	// activate activities tooltips, with details separated by minified hr tags
	activateTooltips('.activities', 'left', function() {
		return $(this).attr('details').split('|').join('<hr class="min">');
	});

	// activate classes tooltips, title and time separated by a minified hr tag
	activateTooltips('.classes', 'right', function() {
		// cache jQuery object and get attributes
		var $this = $(this);
		var title = $this.attr('c-title');
		var time = $this.attr('c-time');

		// include a line if both title and time are not empty
		return title + (title.length && time.length ? '<hr class="min"/>' : '') + time;
	});

})(window, document);

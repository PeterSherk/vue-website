<template>
	<section id="app-about" class="screen__full-height section">
		<div class="columns is-centered">
			<div id="about__pic" class="column is-4-desktop is-5-tablet">
				<figure class="images about__head" alt="Picture of Peter"></figure>
			</div>
			<div class="column is-6">
				<h1 class="title">Peter Sherk</h1>
				<h2 class="subtitle">Principal Full-Stack Software Engineer - Fidelity Investments</h2>
				<div class="content">
					<p>
						Coming into college, I had no idea what my future held. The first year consisted of
						bouncing between different majors, contemplating how each of them might play to one of
						my strengths. This only served to play into a running joke within my family that I was a
						"Renaissance Man", with too many interests to actually pick one.
					</p>
					<p>
						Luckily, I remembered an internship before college where I did some Java development.
						Realizing how fun it was to design and tackle a problem head on, I switched to the
						College of Engineering at
						<a href="https://www.csc.ncsu.edu/" target="_blank">NC State University</a> with a
						concentration in Computer Science. From then on I developed a passion for all aspects of
						Software Engineering, from Agile principles to database, API and front-end design. My
						previous Psychology major came into use as a minor, aiding me in front-end design and
						creating ethical software.
					</p>
					<p>
						This passion lead to two amazing internships at
						<a href="https://www.inmotionnow.com/" target="_blank">InMotionNow</a> as a QA Engineer
						and <a href="https://www.volvotrucks.us" target="_blank">Volvo</a> as a Software Support
						Engineer. Both of these experiences prepared me immensely for my work at
						<a href="https://www.fidelity.com/" target="_blank">Fidelity Investments</a> as a
						researcher, exploring blockchain, distributed systems and the future of technology.
						After a year of research, I looked within Fidelity for something that would bring me
						back to some of the core Software Engineering tenants I loved. This brought me to a role
						at <a href="https://www.fidelitycharitable.org" target="_blank">Fidelity Charitable</a>,
						building a platform that helps people support the charities they love.
					</p>
					<p>
						During the COVID-19 Pandemic, I switched to work as a Senior Full-Stack Engineer for
						<a href="https://www.bandwidth.com" target="_blank">Bandwidth Inc.</a> building a
						next-gen WebRTC platform, as well as leading development on a new MFA solution and API
						Adapter. I received immense exposure to CI/CD, automation, AWS Cloud Development, and
						distributed application knowledge. This spurred my love for cloud technology and an
						appreciation for the operations side of development. Unfortunately, the company itself
						was not a great fit for me, and I missed the company culture that I had been a part of
						at Fidelity.
					</p>
					<p>
						I currently work as a Principal Full-Stack Engineer for
						<a href="https://www.fidelity.com" target="_blank">Fidelity Investments</a> building the
						future of AI chatbot and ML tools.
					</p>
					<p>
						In my free time, I love to <strong>travel</strong> and <strong>cook</strong> as well as
						<strong>sing</strong> and create <strong>music</strong>.
					</p>
				</div>
			</div>
		</div>
		<!-- Skills -->
		<div class="columns is-multiline">
			<div class="column is-11 is-offset-1">
				<h1 class="title">Skills</h1>
			</div>
			<div class="column is-offset-1">
				<h2 class="subtitle">Coding</h2>
				<div class="tags">
					<span class="tag is-info">TypeScript</span>
					<span class="tag is-info">JavaScript</span>
					<span class="tag is-info">Angular</span>
					<span class="tag is-info">Spring Boot</span>
					<span class="tag is-info">HTML/CSS</span>
					<span class="tag is-info">Docker</span>
					<span class="tag is-info">Java</span>
					<span class="tag is-info">Git</span>
					<span class="tag is-info">Node</span>
					<span class="tag is-info">Relational DB's</span>
					<span class="tag is-info">Bash</span>
					<span class="tag is-info">Ethereum</span>
					<span class="tag is-info">Cucumber</span>
					<span class="tag is-info">Protractor</span>
					<span class="tag is-info">Flask</span>
					<span class="tag is-info">SQLAlchemy</span>
					<span class="tag is-info">JPA</span>
					<span class="tag is-info">Python</span>
				</div>
			</div>
			<div class="column is-offset-1">
				<h2 class="subtitle">Team</h2>
				<div class="tags">
					<span class="tag is-success">Collaborator</span>
					<span class="tag is-success">Problem Solver</span>
					<span class="tag is-success">Leader</span>
					<span class="tag is-success">Planner</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script lang="ts">
export default {
	name: 'app-about'
}
</script>

<style lang="scss">
.about__head {
	width: 240px;
	height: 380px;
	box-shadow:
		0 4px 8px 0 rgba(0, 0, 0, 0.2),
		0 6px 20px 0 rgba(0, 0, 0, 0.19);
	border-radius: 10px;
	background-repeat: no-repeat;
	background-image: url('https://api.petersherk.com/img/positano.jpeg');
	background-position: 100% 50%;
	background-size: cover;
}
</style>

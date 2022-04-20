import React, { useState } from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import axios from 'axios';
import { Alert, StyleSheet, Text, Pressable, View } from "react-native";
import Modal from "react-native-modal";
import NavBar from '../components/NavBar';
import './toc.css';

export default function page1() {




      return (
        <div className='content'>
          <aside className="table-of-contents">
          <span className="toc-title">Content</span>
          <ol className="toc-links">
            <li><a href="#why-i-created-this">1. Overview: The why &amp; how</a></li>
            <ul>
              <li><a href="#anchor-links">Why I created this</a></li>
              <li><a href="#how-it-works">How my strategy works</a></li>
              <li><a href="#css">How the app helps</a></li>
            </ul>
            <li><a href="eating">2. Eating</a></li>
            <ul>
              <li><a href="#anchor-links">Quantity is King</a></li>
              <li><a href="#how-it-works">Fasting: Quantity control</a></li>
              <li><a href="#css">How much to eat after a fast</a></li>
            </ul>
           
            <li><a href="#html">3. Working out</a></li>
            <ul>
              <li><a href="#anchor-links">75 minutes of vigorous cardio</a></li>
              <li><a href="#how-it-works">Two days of some kind of strength training.</a></li>
              <li><a href="#css">How the app helps</a></li>
            </ul>
            <li><a href="#drinkings">4. Drinking</a></li>
            <ul>
              <li><a href="#anchor-links">Why I created this</a></li>
              <li><a href="#how-it-works">How my strategy works</a></li>
              <li><a href="#css">How the app helps</a></li>
            </ul>
          </ol>
        </aside>

        <h1>1. Overview: The why &amp; how</h1>
<h2>Why I created this</h2>
<p>I developed this lifestyle once I realized that living like a 23 year-old while I was 33 years-old was no longer going to work. I had had many failures trying to maintain a healthy lifestyle, and took almost a decade of failing to devise this method.</p>
<p><strong>The goal of this lifestyle is to maintain the following health metrics:</strong></p>
<ul>
<li>Maintain my weight within the recommended weight for my height</li>
<li>Maintain a blood pressure of less than 120/80</li>
<li>Maintain HDL of &gt;</li>
<li>Maintain LDL of &lt;</li>
</ul>
<p>Those data points are my definition of healthy, and are pretty universally accepted as healthy by the scientific community. In my personal experience the lifestyle that results from going on the journey to maintain these numbers made me look, feel, and think better. Remember, it&rsquo;s not about &ldquo;achieving&rdquo; these numbers, it&rsquo;s about &ldquo;maintaining&rdquo; these numbers over a long life.</p>
<h2>How my strategy works</h2>
<h3>Think in weeks, not days</h3>
<p>For my lifestyle I try to have healthy weeks, and not beat myself up if I screw up a day here and there. Life is about balance. It&rsquo;s so easy for a healthy day (I define healthy in a moment) to go wrong. You&rsquo;re at work and get invited to a happy hour, or you had a stressful day and just need a beer and a cheeseburger. I found that if I beat myself up for messing up a day, I quickly built up a few losses and became disinterested. But focusing on an entire week gave me the flexibility to plan a life.&nbsp;</p>
<p>The goal of this app is to <strong>try</strong> and accomplish the following and not beat yourself up if you fail:</p>
<ul>
<li>Workout 5 days a week</li>
<li>Eat healthy 5 days a week</li>
<li>Drink less than 14 drinks a week</li>
</ul>
<h2>How the app improves success</h2>
<p>The app reminds you to record three data points every day:</p>
<ol>
<li>Did I workout</li>
<li>Did I eat healthily</li>
<li>How many alcoholic drinks I had</li>
</ol>
<p>Checklists are an amazing tool (check out the book <a href="https://www.amazon.com/Checklist-Manifesto-How-Things-Right/dp/0312430000" target="_blank" rel="noopener">The Checklist Manifesto</a>) used by highly competent experts (doctors, pilots, chefs) to avoid basic mistakes caused by everyday distractions. Checklists also keep you accountable, and give you <a href="https://hbr.org/2017/02/break-bad-habits-with-a-simple-checklist" target="_blank" rel="noopener">small wins</a> throughout the week which makes it easier to form habits.&nbsp;</p>
<p>Counting alcoholic drinks has some nuance (which I&rsquo;ll get into) but overall is pretty straightforward. The room for complexity comes from trying to define:</p>
<p>What the hell does &ldquo;<strong>workout&rdquo;</strong> or &ldquo;<strong>eat healthily&rdquo; </strong>even mean?&nbsp;</p>
<p>Great question. Finding the answer to those questions is going to take time. But I can help you.</p>
<p>Over the past decade I have developed a pretty robust definition of what &lsquo;workout&rsquo; or &lsquo;eat healthily&rsquo; means and after the first few weeks, you&rsquo;ll have your first definition as well. Part of the joy of this program is becoming more aware of what you eat and how you workout, and those are things you&rsquo;ll be tweaking and refining for the rest of your life.&nbsp;</p>
<h1>2. Eating</h1>
<h2>Quantity is King</h2>
<p>Nutrition is both incredibly complex and poorly understood by the scientific community. And that&rsquo;s not for lack of trying, it&rsquo;s basically <a href="https://www.medicalnewstoday.com/articles/why-is-nutrition-so-hard-to-study#In-lieu-of-perfection" target="_blank" rel="noopener">impossible</a> to conduct a controlled nutrition study.</p>
<p>My approach to eating has been to put more attention on how much I am eating, and slightly less attention on what I am eating. It&rsquo;s of critical importance to master quantity, and after we get that down we can talk about quality.</p>
<p>To record a healthy day of eating in the app two things need to be true:</p>
<ol>
<li>I need to have completed a fast</li>
<li>I need to have eaten the right quantity of food to ensure I lose weight</li>
</ol>
<h2>Fasting: Quantity control + added benefits (maybe)</h2>
<p>I have never been one for portion control. If a steakhouse is going to give me a ribeye, I am going to eat the ribeye. There is little chance I don&rsquo;t finish what&rsquo;s on my plate. The workaround I have found to portion control is to only eat certain times of the day- what&rsquo;s known as intermittent fasting.</p>
<p>For me, the main benefit of using intermittent fasting as portion control is that it&rsquo;s easy as hell to do. There is no measuring food or counting points, you spend less time a day eating. There is only so much you can eat in 8 hours. On top of that, a potential bonus to intermittent fasting is that there is growing research that giving your body time between meals has <a href="https://www.health.harvard.edu/blog/intermittent-fasting-surprising-update-2018062914156" target="_blank" rel="noopener">medical benefits</a> that work in my favor to reduce <a href="https://www.sciencedaily.com/releases/2021/04/210429123340.htm" target="_blank" rel="noopener">blood pressur</a>e.&nbsp;</p>
<p>How to do it:</p>
<ul>
<li>Skip breakfast (only water and black coffee)</li>
<li>Eat lunch</li>
<li>Eat dinner</li>
<li>Wait 16 hours before eating lunch</li>
</ul>
<p>So most days I take note of when I&rsquo;m done eating for the day. This is generally around or before 8:00pm. So what I do to make the math easy is add 4 hours and swap PM for AM. So if I took my last bite at 7:30PM I add 4 hours and swap AM for PM and bam, no eating till 11:30AM the next day.&nbsp;</p>
<p>This has the added benefit of making me commit to stop eating for a day. I generally will brush my teeth for the night at this time to seal it in. Because who the heck eats after brushing their teeth at night.</p>
<p>Getting started with fasting comes with some emotions&hellip;</p>
<p><strong>Won&rsquo;t I be starving?</strong></p>
<p>For the first few times I did it, yes I was hungry, but my body adapted. Overtime I found a lightness and a focus that came towards the end of my fasts that I really enjoy, but that is probably all in my head.</p>
<p><strong>Can&rsquo;t I just stuff three meals into 8 hours?</strong></p>
<p>Yes you could. But don&rsquo;t. Drop a meal.</p>
<p><strong>Is it really just black coffee and water? What about milk in my coffee?</strong></p>
<p>Just black coffee, plain tea, or water. Today it&rsquo;s a tablespoon of milk, tomorrow it&rsquo;s a donut.&nbsp;</p>
<p><strong>Do I need to do this everyday?</strong></p>
<p>My lifestyle has me try to do it 5 days a week. Sometimes I just need a breakfast sandwich (hungover).</p>
<p><strong>How do I start?</strong></p>
<p>I outline this in the starting guide, but I recommend starting with 12 hours and slowly ramp up.</p>
<h2>How much to eat after a fast</h2>
<p>So here is where I am going to go a bit science nerd on you.</p>
<p>When I am eating on a healthy day I eat less than the amount of calories I burn in a day.</p>
<p>STOP IT! PUT THE CALORIE CALCULATOR DOWN!</p>
<p>I need you to focus here. We need to try and be aware of the calories we are eating, not count every single one. This is going to take time for you to get good at. If you jump in right away with scales and measuring tapes like I did, you are going to fail, like I did many times.</p>
<p>The amount of calories I eat on a healthy day is less than the amount we burn. The body runs on calories, we burn them breathing, sitting and even eating. You can get a rough estimate of what your number is using a basic calculator.</p>
<p>[BMR Calculator]</p>
<p>Your basal metabolism rate is produced through the following basal metablic rate formula:</p>
<p>Men: BMR = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) &ndash; (5.677 x age in years)</p>
<p>Women: BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) &ndash; (4.330 x age in years)</p>
<p>So in order to record a healthy eating day in the app, you need to eat less calories than your BMR. This is where you can start using common sense to figure out how much volume you want to eat. For example a giant salad with very light dressing can fill you up and still be half the calories of a BLT Sandwich.&nbsp;</p>
<p><strong>How am I going to measure calories?</strong></p>
<p>Guesstimate. Estimate. Ballpark it. Literally <a href="https://www.google.com/search?q=how+many+calories+in+a+blt+sandwich&amp;sxsrf=APq-WBuRXkLsyuoesDFMbsh1WujCT6Tm3A%3A1649206365132&amp;ei=XeRMYuHiB5uHptQP0qeV6As&amp;oq=how+many+calories+in+a+blt+sand&amp;gs_lcp=Cgdnd3Mtd2l6EAMYADIFCAAQgAQyBQgAEIAEMgUIABCABDIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeOgQIABBDOgoIABCABBCHAhAUSgQIQRgASgQIRhgAUABYighg9w5oAHABeACAAVGIAbEEkgEBOJgBAKABAcABAQ&amp;sclient=gws-wiz" target="_blank" rel="noopener">every food</a> can be quickly Googled for a calorie count. You will get a better sense of it over time.&nbsp;</p>
<p><strong>But what about the calories I burn from a workout?</strong></p>
<p>Good question- I was never certain what the number is. A 3 mile jog burns around 400 calories, so sometimes I would add a little more wiggle room to my BM Rate if I was still hungry, but since I am not doing aggressive heavy lifting or running 10 miles, I stayed below my BMR.</p>
<p>So unless you are really certain what you are burning during a workout (if you are, I doubt any of this program will be helpful to you) then I would stick to the BM Rate.</p>

<h1>3. Working out&nbsp;</h1>

<p>Working out for me took years to get decent at. So many false starts. There is no way you are going to be great at it on week one or even week ten of using this app. It&rsquo;s about a slow and deliberate ramp up. It&rsquo;s okay to miss days at first, just don&rsquo;t stop tracking.</p>
<p>The workout I do is lifted directly from the <a href="https://www.cdc.gov/physicalactivity/basics/adults/index.htm" target="_blank" rel="noopener">CDC</a> recommendation. Every week a human needs:</p>
<li>75 minutes of vigorous cardio&nbsp;</li>
<li>Two days of some kind of strength training.</li>
<h2>75 minutes of vigorous cardio</h2>
<h2>Two days of some kind of strength training.</h2>
<p>So what that breaks down into for me is:</p>
<ul>
<li>3 jogs a week</li>
<li>2 strength training days a week</li>
</ul>
<h1>4. Drinking Alcohol</h1>
<p>SOmething!</p>
            
            
            </div>
          )
      }



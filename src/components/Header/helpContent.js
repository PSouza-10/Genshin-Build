import React from 'react'
import HelpContent from './helpComponents'

export default {
  introduction: (
    <HelpContent>
      <h3 className='title'>
        Welcome to the Genshin Impact build planning tool!
      </h3>
      <p className='text'>
        This tool helps you measure the damage output of your builds by
        calculating stats according to the selected loadout. Do keep in mind
        that most of your build efficiency comes from team composition, combat
        strategies, and your skill in the game, as such, this tool only helps
        you in determining ideal stat values and does not in any way dictate the
        best build for your character in every situation, as that is dependant
        on other factors. These factors will be incorporated into the
        application in future updates.
      </p>
      <br></br>
      <br></br>
      <h3 className='title'>Current Limitations</h3>
      <p className='text'>
        At the current moment, stats values are at some level of innacuracy, by
        extension, the damage displayed will differ somewhat from what you
        actually see in the game. Do keep in mind that in the current version of
        the application (1.0), only 1-Hit DMG for the auto-attack talent is
        calculated.
        <br></br>
        <br></br>
        This will be improved upon as more data is collected to improve
        calculations, and the community dissects formulas.
      </p>
      <br></br>
      <br></br>
      <h3 className='title'>Disclaimer</h3>
      <p className='text'>
        Genshin Build Planner is not affiliated with or endorsed by miHoYo.
        <br></br>
        <br></br>
        All assets contained in or related to the game "Genshin Impact" are
        owned by miHoYo .
      </p>
    </HelpContent>
  ),
  userGuide: (
    <HelpContent>
      <h3 className='title'>
        Item/Character Grid (Top Left, or Top in Mobile)
      </h3>
      <p className='text'>
        Click/touch the icon of the desired category (Characters, Weapons,
        Artifacts) to display available items. The last icon allows you to load
        files saved in the manner described on the "Sharing/saving: Download
        File" section of the User Guide.
        <br></br>
        <br></br>
        On Desktop, click an item once to view its information at level 1.
        Double click to select it, allowing the possibility to view stats at
        other levels. Alternatively, click the "Select" button at the bottom to
        select the item.
        <br></br>
        <br></br>
        On Mobile, touching an item will open a window where you can view item
        info. As in the Desktop version, touch the "Select" button at the bottom
        to select the item.
        <br></br>
        <br></br>
        Type an item's name in the search bar to see matching results. You may
        filter Characters, Weapons, and Artifacts by element, type, and set
        respectively through the filter dropdown on the right.
        <br></br>
        <br></br>
        If character and weapon types are incompatible (eg: attempting to equip
        Noelle with a Bow), the action won't go through and a message will be
        displayed.
      </p>
      <br></br>
      <br></br>
      <h3 className='title'>
        Selected Character/Items (Bottom left, or middle in Mobile)
      </h3>
      <p className='text'>
        Click/touch an item once to view its information, and open the window to
        select character talents and artifact stats. To deselect it,
        double-click the slot(Desktop) or Click/touch the item once and press
        "Remove"(Mobile).
        <br></br>
        <br></br>
        On each slot, you can alter the ascension level for characters and
        weapons, or the stars for artifacts, by clicking/touching the - and +
        buttons. The application will accomodate the minimum/maximum level for
        ascensions and artifact stars.
        <br></br>
        <br></br>
        Similarly, you may increase or decrease the level of the relevant item,
        through the buttons, or input the desired level directly through
        clicking the number. Levels selected in this way will be validated
        according to the ascension/stars of the item, and reset if the
        validation fails.
        <br></br>
        <br></br>
        To clear the selected build, press the trash icon, you will be prompted
        to confirm your decision.
      </p>
      <br></br>
      <br></br>
      <h3 className='title'>Stat Display (Right, or bottom in mobile)</h3>
      <p className='text'>
        The most important calculated values are displayed here (eg. Damage,
        Total ATK). Click on the Damage or the Crit damage stat to select the
        enemy and its level to improve damage accuracy (Some resistances are a
        little off).
        <br></br>
        <br></br>
        Press the "All Stats" button at the bottom to inspect specific stat
        values and how much artifacts/weapons give you.
        <br></br>
        <br></br>
        Once an item has been selected, this section will display its
        information. For Characters, you may alter the auto-attack talent's
        level. For artifacts, you can change the main stat for the Sands of Eon,
        Goblet of Eonotherm, and Circlet of Logos slots, and the substats on all
        slots (cannot be equal to main stat). Sub Stat value formulas are not
        currently known according to my research, so input the relevant value as
        displayed in the game, or play with estimates by typing the number
        manually after selecting it.
        <br></br>
        <br></br>
        Press the X icon on the top left to view calculated stats again.
      </p>
      <br></br>
      <br></br>
      <h3 className='title'>Sharing/saving (Top Right)</h3>
      <p className='text'>
        Press the share icon to view available sharing options ( Forward to App
        (Mobile only), Share link, and Download File).
        <br></br>
        <br></br>
        <span className='bold'>Forward to App(Mobile Only): </span> Selecting
        this option will open a window to share a link to your build. Your
        device/browser may not support sharing in this manner, and in that case
        you will be warned. If you do come across this, contact me as instructed
        in the contribute section.
        <br></br>
        <br></br>
        <span className='bold'>Copy Link: </span> Copies a link to your build.
        This link does not expire, and builds loaded from it unfortanely do NOT
        store artifact stats/sub stats. This will be changed in the future.
        <br></br>
        <br></br>
        <span className='bold'>Download File: </span> Downloads a file with all
        the information about the current build. If this file is modified and
        you attempt to load it, the application may break, therefore, exercise
        caution at least for now, as measures will be taken to prevent this.
        <br></br>
        <br></br>
        You may load these files by pressing the last button on the Item Grid
        navbar, selecting the files and uploading them.
      </p>
    </HelpContent>
  ),
  howItWorks: (
    <HelpContent>
      <h3 className='title'>Total ATK calculation</h3>
      <p className='text'>
        Total ATK is calculated according to the formula below:
        <br></br>
        <br></br>
        <i>
          Total ATK = Base ATK + ((Base ATK * (ATK% bonuses / 100)) + Flat ATK
          Bonus
        </i>
        <br></br>
        <br></br>
        Where Base ATK is the sum of character and weapon ATK, ATK% Bonuses is
        the sum of ATK% stats from weapon, and artifact main/sub stats, and Flat
        ATK Bonus pertains to the Feather Main Stat + all other +ATK sub stats.
      </p>
      <br></br>
      <br></br>
      <h3 className='title'>Damage and CRIT Damage</h3>
      <p className='text'>
        Damage is calculated according to the formula below:
        <br></br>
        <br></br>
        <i>
          Damage = Total ATK * (Talent Multiplier / 100) * ((100 + Character
          Level) / (200 + Character Level + Enemy Level)) * (1 +
          (Elemental/Physical DMG Bonus + Raw DMG% Bonus) / 100)
        </i>
        <br></br>
        <br></br>
        Talent Multiplier is equal to the %ATK value seen on the selected
        character information window.
        <br></br>
        Physical and Elemental damage are currently applied according to the
        Character weapon type, as Catalyst users auto-attacks always deal their
        elemental type in damage, and non Catalyst users deal Physical Damage.
        As other talents are added, bonuses will be applied according to how
        each specific talent works.
        <br></br>
        <br></br>
        CRIT Damage is calculated according to the formula below:
        <br></br>
        <br></br>
        <i>CRIT Damage = Damage * (1 + (Total CRIT DMG%/100))</i>
        <br></br>
        <br></br>
        Total CRIT DMG% is equal to the sum of weapon and artifact CRIT DMG%
        main/sub stats.
      </p>
      <br></br>

      <h3 className='title'>Sources</h3>
      <br></br>

      <p className='text'>
        All data on this page was taken from the Genshin Impact wiki, and will
        be updated accordingly.
      </p>
    </HelpContent>
  ),
  contribute: (
    <HelpContent>
      <h3 className='title'>Contact</h3>
      <br></br>

      <p className='text'>
        If you have issues with the app, suggestions, or can help with
        values/formulas, join our discord server!
        <br></br>
        <a
          href='https://discord.gg/Xrxz4ASWuz'
          target='_blank'
          rel='noopener noreferrer'>
          Discord
        </a>{' '}
        <br></br>
      </p>
    </HelpContent>
  )
}

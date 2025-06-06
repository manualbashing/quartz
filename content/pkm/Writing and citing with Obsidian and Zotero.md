---
title: Writing and citing with Obsidian and Zotero
date: 2023-11-22
author: Manuel Batsching
socialDescription: "Zotero and Obsidian: BFF"
socialImage: zotero-obsidian-bff.jpg
---

In this post, I want to show you how to set up a very basic system for academic writing in Obsidian. This will be a step-by-step guide, where we start with an empty vault, and enable the following features:

- Adding literature references, which are organized in Zotero, to a Markdown text.
- Exporting this Markdown text to Microsoft Word's DOCX[^1] format, including an automatically generated bibliography.


## Requirements

For what follows I assume, that you have the following tools installed:

  - [Obsidian](https://obsidian.md/download)
  - [Zotero](https://www.zotero.org/download/)
  - [Pandoc](https://pandoc.org/installing.html)

The following instructions are written on a system using Microsoft Windows 11, but none of the tools are strictly platform dependent. All this is also possible on both macOS and your favorite Linux distribution. 

To keep this blog post focused, I will assume, that you are already a bit familiar with Obsidian and Zotero.
## Use citations from Zotero in Obsidian

In order to make your Zotero play nicely with the Obisidian plugin that we will be using, you need to install the Better BibTex plugin in Zotero: [Installation - Better BibTeX for Zotero (retorque.re)](https://retorque.re/zotero-better-bibtex/installation/index.html). If you are unfamiliar with the process of installing Zotero plugins, be sure to download the latest version in XPI format and follow the installation instructions at the link above.

### Export the Zotero library in BibTeX format

Once the plugin is installed, create BibTeX based export of your library by performing the following steps:
- Click `[File]` > `[Export Library]`:
- Make sure you set the Format to `Better BibLaTeX`
- Tick the `Keep updated` box

  ![export-zotero-library.png](images/export-zotero-library.png)
You will be prompted to choose a file location under which you want to save the file. I prefer to use the path `%AppData%\Roaming\obsidian` under Windows, but it can really be any path that you like.

{{% callout emoji="☝️" text="Make sure that the path and file name **does not include** any spaces. This is due to a  limitation in the Pandoc obsidian plugin ([see this issue](https://github.com/OliverBalfour/obsidian-pandoc/issues/159)) for details." %}}

![export-zotero-library-path.png](images/export-zotero-library-path.png)

{{% callout emoji="😉" text="Be sure to write down the full path to your exported library file, as we will need it later." %}}

### Enable and configure the citation plugin in Obsidian

In Obsidian, go to settings and enable Community plugins. Once that is done, click `[Browse]` and search for the "Citations" plugin by Jon Gauthier:[^2]

  ![citations-plugin.png](images/citations-plugin.png)
  Click `[Install]` > `[Enable]` > `[Options]` to install and enable the plugin and to open the settings screen. In the settings do the following:
- Change the value of `Citation database format` to `BibLaTeX`
- Change the value of `Citation database path` to the full path of the BibLaTex File that you have exported above.

![citation-plugin-options.png](images/citation-plugin-options.png)

Close the settings and open the Obsidian command palette to run `Citations: Refresh citation database`.
### Insert your first citation

Now that Zotero and Obsidian are configured, create a new markdown file and do the following:

- Place the cursor anywhere in the file
- From the command palette run `Citations: Insert Markdown citation`
- This will show a popup from which the citations can be selected.
- Hit enter to select any of the citations.

 ![images/add-first-citations.gif](images/add-first-citations.gif)
This will insert the citation key in the [Pandoc Citation syntax](https://pandoc.org/chunkedhtml-demo/8.20-citation-syntax.html): `[@key]`.  See the linked documentation for how this syntax works. The following patterns are what I personally use most of the time:
- Citation with page number: `[@smith1992, p. 12]`
- Citation with page number and footnote `[@smith1992, p. 14, fn. 2 ]`
- Multiple citations with page number: `[@smith1992, p. 12; @jones1992, p. 5]`
- Inline citation `"According to @smith1992 bla..."`

{{% callout emoji="📎" text="Also you might want to set yourself a convenient hotkey for the `Citations: Insert markdown citation` command. I am using `Ctrl-O` " %}}

## Export a markdown document with citations to MS Word

Now let's see our system in action, by exporting it to a more familiar format. To makes this happen, you need to make sure, that you have [Pandoc](https://pandoc.org/installing.html) installed.

### Configure Obsidian to use pandoc for export

In Obsidian, go to settings and then Community plugins. Click `[Browse]` and search for the  "Pandoc" plugin by Oliver Balfour.

![pandoc-plugin.png](images/pandoc-plugin.png)

 Click `[Install]` > `[Enable]` > `[Options]` to install and enable the plugin and to open the settings screen. In the settings, do the following:
 - Change the value of `Export files from HTML or markdown` to `Markdown`
 - Add the following to "`Extra Pandoc Arguments`:

    ```shell
    -s --toc --citeproc --metadata bibliography="C:\Users\YOURUSER\AppData\Roaming\obsidian\MyLibrary.bib"
    ```

The value for `bibliography` must be the full BibTeX file that you exported in an earlier step. Be sure, that the path does not contain spaces.

![pandoc-plugin-options.png](images/pandoc-plugin-options.png)

{{% callout emoji="🤓" text="If the Plugin says, that Pandoc cannot be found in your path, it helps to restart Obsidian" %}}

### Insert a citation into a Markown document

- Go to the document that has the citations from an earlier step.
  - From the command menu choose "Pandoc Plugin: Export as Word document"
  - This creates a DOCX file, that will have the BibLaTex references expanded to literature citations and builds a Reference list at the end of the file.
![images/export-to-docx.gif](images/export-to-docx.gif)


## Extra: Make reference keys easier to read in Obsidian

- Install the Pandoc Reference List Plugin by mgmeyers:
  
  ![pandoc-reference-list-plugin.png](images/pandoc-reference-list-plugin.png)
  
  - Enable and open the options
  - Set the "path to the bibliography file" to your exported BibLaTeX file
  
  ![images/pandoc-reference-list.gif](images/pandoc-reference-list.gif)
  
## Extra: Use a specific citation style

- Default CSL is Harvard
- You might need to use IEEE

[^1]: Or a lot of other output formats like LaTeX or EPUB. But we stick with Word for now, as that is what I assume most people are familiar with.
[^2]: The Zotero integration plugin ([mgmeyers/obsidian-zotero-integration](https://github.com/mgmeyers/obsidian-zotero-integration)) also seems to be a popular choice. For this post, I will focus on the citation plugin, as this is the only one that I currently have experience with.
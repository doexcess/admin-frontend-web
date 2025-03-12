// components/custom-editor.js
'use client'; // only in App Router

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  Autosave,
  BlockQuote,
  Bold,
  Essentials,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  HtmlComment,
  HtmlEmbed,
  Indent,
  IndentBlock,
  Italic,
  Link,
  Paragraph,
  SelectAll,
  ShowBlocks,
  SourceEditing,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  Underline,
  Undo,
  Font,
  List,
  Image, 
  ImageInsert,
  ImageInline,
  ImageResizeEditing, 
  ImageResizeHandles,
  ImageToolbar
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import React, { useEffect, useState } from 'react';

function CkEditor() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <div>Loading...</div>}
      <CKEditor
        editor={ClassicEditor}
        onReady={(editor) => {
          setLoading(false); // Hide loading indicator
        }}
        config={{
          toolbar: {
            items: [
              'undo',
              'redo',
              '|',
              'sourceEditing',
              'showBlocks',
              '|',
              'heading',
              '|',
              'fontColor', 
              'fontBackgroundColor',
              'bold',
              'italic',
              'underline',
              '|',
              'insertImageViaUrl',
              'link',
              'insertTable',
              'blockQuote',
              'htmlEmbed',
              '|',
              'bulletedList', 
              'numberedList',
              'outdent',
              'indent',
            ],
          },
          plugins: [
            AccessibilityHelp,
            Autoformat,
            Autosave,
            BlockQuote,
            Bold,
            Essentials,
            FullPage,
            GeneralHtmlSupport,
            Heading,
            HtmlComment,
            HtmlEmbed,
            Indent,
            IndentBlock,
            Italic,
            Link,
            Paragraph,
            SelectAll,
            ShowBlocks,
            SourceEditing,
            Table,
            TableCaption,
            TableCellProperties,
            TableColumnResize,
            TableProperties,
            TableToolbar,
            TextTransformation,
            Underline,
            Undo,
            Font,
            List,
            Image,
            ImageInsert,
            ImageInline, 
            ImageResizeEditing, 
            ImageResizeHandles,
            ImageToolbar
          ],
          heading: {
            options: [
              {
                model: 'paragraph',
                title: 'Paragraph',
                class: 'ck-heading_paragraph',
              },
              {
                model: 'heading1',
                view: 'h1',
                title: 'Heading 1',
                class: 'ck-heading_heading1',
              },
              {
                model: 'heading2',
                view: 'h2',
                title: 'Heading 2',
                class: 'ck-heading_heading2',
              },
              {
                model: 'heading3',
                view: 'h3',
                title: 'Heading 3',
                class: 'ck-heading_heading3',
              },
              {
                model: 'heading4',
                view: 'h4',
                title: 'Heading 4',
                class: 'ck-heading_heading4',
              },
              {
                model: 'heading5',
                view: 'h5',
                title: 'Heading 5',
                class: 'ck-heading_heading5',
              },
              {
                model: 'heading6',
                view: 'h6',
                title: 'Heading 6',
                class: 'ck-heading_heading6',
              },
            ],
          },
          htmlSupport: {
            allow: [
              {
                name: /^.*$/,
                styles: true,
                attributes: true,
                classes: true,
              },
            ],
          },
          link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            decorators: {
              toggleDownloadable: {
                mode: 'manual',
                label: 'Downloadable',
                attributes: {
                  download: 'file',
                },
              },
            },
          },
          placeholder: 'Compose an email',
          table: {
            contentToolbar: [
              'tableColumn',
              'tableRow',
              'mergeTableCells',
              'tableProperties',
              'tableCellProperties',
            ],
          },
          fontColor: {
            colors: [
              {
                color: '#164CC1',
                label: 'ChiPay Blue',
                hasBorder: true,
              },
              {
                color: '#2563EB',
                label: 'ChiPay Light Blue',
                hasBorder: true,
              },
              {
                color: '#FFFFFF',
                label: 'ChiPay White',
                hasBorder: true,
              },
              {
                color: '#121212',
                label: 'ChiPay Dark',
                hasBorder: true,
              },
              {
                color: '#219653',
                label: 'ChiPay Green',
                hasBorder: true,
              },
              {
                color: '#E6F6F1',
                label: 'ChiPay Light Green',
                hasBorder: true,
              },
              {
                color: '#F6F9FF',
                label: 'ChiPay Gray',
                hasBorder: true,
              },
            ],
            colorPicker: {
              format: "hex" 
            }
          },
          fontBackgroundColor: {
            colors: [
              {
                color: '#164CC1',
                label: 'ChiPay Blue',
                hasBorder: true,
              },
              {
                color: '#2563EB',
                label: 'ChiPay Light Blue',
                hasBorder: true,
              },
              {
                color: '#FFFFFF',
                label: 'ChiPay White',
                hasBorder: true,
              },
              {
                color: '#121212',
                label: 'ChiPay Dark',
                hasBorder: true,
              },
              {
                color: '#219653',
                label: 'ChiPay Green',
                hasBorder: true,
              },
              {
                color: '#E6F6F1',
                label: 'ChiPay Light Green',
                hasBorder: true,
              },
              {
                color: '#F6F9FF',
                label: 'ChiPay Gray',
                hasBorder: true,
              },
            ],
            colorPicker: {
              format: 'hex'
            }
          },
          image: { 
            insert: { 
              type: 'inline'
            },
          }
        }}
      />
    </>
  );
}

export default CkEditor;

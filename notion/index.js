import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

export const databaseId = process.env.NOTION_MEDIA_ID;

export const getDatabase = async (databaseId, options) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    ...options
  });
  return response;
};

export const getPage = async (pageId) => {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
};

export const getBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId
  });
  return response.results;
};

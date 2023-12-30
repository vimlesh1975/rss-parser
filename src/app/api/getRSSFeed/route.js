
import  Parser   from 'rss-parser'
export async function POST(req, res) {
    const body = await req.json();
    let parser = new Parser();
    let feed = await parser.parseURL(body.query);
    return new Response(JSON.stringify(feed));
  }
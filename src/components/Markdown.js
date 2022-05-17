import React from "react";
import ReactMarkdown from "react-markdown";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrowNight as Theme } from "react-syntax-highlighter/dist/esm/styles/hljs"; 
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const Markdown = (props) => {
    const { statement } = props;
    
    return (
        <div className="preview-wrapper">
            <ReactMarkdown
                children={statement}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                className="preview"
                                children={String(children).replace(/\n$/, '')}
                                style={Theme}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            />
                            ) : (
                                <code className={className} {...props}>
                                { children }
                            </code>
                        )
                    }
                }}
            />
        </div>
    );
}
 
export default Markdown;
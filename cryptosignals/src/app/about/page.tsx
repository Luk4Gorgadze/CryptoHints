import React from 'react';

export default function About() {
    return (
        <div className="about-page mx-auto py-8 w-[80%] text-black dark:text-white mb-[200px]">
            <h1 className="text-xl font-bold mb-4 text-primary">About CryptoHints</h1>
            <p>
                CryptoHints empowers you to navigate the ever-changing cryptocurrency market with timely insights delivered directly to your Telegram chats. We utilize the Moving Average Convergence Divergence (MACD) indicator on daily charts to identify potential buying opportunities for leading cryptocurrencies like Bitcoin (BTC), Ethereum (ETH), Ripple (XRP), Litecoin (LTC) - all paired with USDT (Tether).
            </p>
            <div className="disclaimer mt-4">
                <p className="text-xl mt-4 font-bold text-primary ">Important Disclaimer:</p>
                <p className="mt-4">CryptoHints is an automation tool and does not guarantee profits. The cryptocurrency market is inherently volatile, and past performance is not necessarily indicative of future results. Our signals are for informational purposes only and should not be considered financial advice. It's crucial to conduct your own research, understand market conditions, and consider your risk tolerance before making any investment decisions.</p>
            </div>
            <h2 className="text-xl mt-4 text-primary font-bold">Why Choose CryptoHints?</h2>
            <ul className="list-disc ml-4 mt-4">
                <li>Seamless Communication: Receive clear buy signals directly in your Telegram chats.</li>
                <li>Focus on Top Cryptos: Track signals for established cryptocurrencies with high market capitalization.</li>
                <li>Daily Updates: Stay informed with fresh signals generated every day, allowing you to adapt your strategy as the market fluctuates.</li>
                <li>Informed Decisions: Gain valuable insights to empower your investment strategy, not guarantees.</li>
            </ul>
            <h1 className="text-xl mt-4 font-bold mb-4 text-primary">Reach out for feedback / help: </h1>
            <p>Contact me via email: luka.g.gorgadze.business@gmail.com</p>
        </div>
    );
}

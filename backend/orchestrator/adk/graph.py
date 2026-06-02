import asyncio

from orchestrator.adk.nodes import (
    news_node,
    stock_node,
    analyst_node,
    insight_node
)


class FinancialGraph:

    async def run_async(
        self,
        state
    ):

        print(
            "\n🚀 GRAPH EXECUTION STARTED"
        )

        # --------------------------------
        # PARALLEL EXECUTION
        # --------------------------------
        print(
            "\n⚡ Running nodes in parallel"
        )

        await asyncio.gather(

            asyncio.to_thread(
                news_node,
                state
            ),

            asyncio.to_thread(
                stock_node,
                state
            )
        )

        # --------------------------------
        # DEPENDENT NODES
        # --------------------------------
        print(
            "\n🧠 Running dependent nodes"
        )

        state = (
            analyst_node(state)
        )

        state = (
            insight_node(state)
        )

        print(
            "\n✅ GRAPH EXECUTION COMPLETED"
        )

        return state

    def run(
        self,
        state
    ):

        return asyncio.run(
            self.run_async(
                state
            )
        )


financial_graph = (
    FinancialGraph()
)
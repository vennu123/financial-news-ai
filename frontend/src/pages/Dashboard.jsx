import {
  useState,
  useEffect
} from "react"

import axios from "axios"

import {
  onAuthStateChanged
} from "firebase/auth"

import { auth }
from "../firebase"

import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"
import CompanyCard from "../components/CompanyCard"
import NewsList from "../components/NewsList"
import InsightCard from "../components/InsightCard"
import KPISection from "../components/KPISection"
import ConfidenceChart from "../components/ConfidenceChart"
import SentimentGauge from "../components/SentimentGauge"
import HistorySidebar from "../components/HistorySidebar"
import ComparisonTable from "../components/ComparisonTable"
import AIExplanationCard from "../components/AIExplanationCard"
import StockChart from "../components/StockChart"


const API_BASE_URL =
  import.meta.env
    .VITE_API_BASE_URL


function Dashboard() {

  const [user, setUser] =
    useState(null)

  const [
    authLoading,
    setAuthLoading
  ] = useState(true)

  const [data, setData] =
    useState(null)

  const [
    compareData,
    setCompareData
  ] = useState(null)

  const [
    loading,
    setLoading
  ] = useState(false)

  const [
    refreshHistory,
    setRefreshHistory
  ] = useState(0)


  // AUTH LISTENER
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(
            currentUser
          )

          setAuthLoading(
            false
          )
        }
      )

    return () =>
      unsubscribe()

  }, [])


  // -------------------------
  // FETCH SINGLE COMPANY
  // -------------------------
  const fetchCompany =
    async (company) => {

      try {

        setData(null)
        setCompareData(null)

        setLoading(true)

        const response =
          await axios.get(
            `${API_BASE_URL}/run/${company}`,
            {
              params: {
                user_id:
                  user.uid
              }
            }
          )

        setData(
          response.data
        )

        setRefreshHistory(
          prev => prev + 1
        )

      } catch (error) {

        console.log(error)

        alert(
          "Something went wrong"
        )

      } finally {

        setLoading(false)
      }
    }


  // -------------------------
  // COMPARE COMPANIES
  // -------------------------
  const compareCompanies =
    async (
      company1,
      company2
    ) => {

      try {

        setData(null)
        setCompareData(null)

        setLoading(true)

        const response =
          await axios.get(
            `${API_BASE_URL}/compare/${company1}/${company2}`,
            {
              params: {
                user_id:
                  user.uid
              }
            }
          )

        setCompareData(
          response.data
        )

        setRefreshHistory(
          prev => prev + 1
        )

      } catch (error) {

        console.log(error)

        alert(
          "Comparison failed"
        )

      } finally {

        setLoading(false)
      }
    }


  // -------------------------
  // AUTH LOADING
  // -------------------------
  if (authLoading) {

    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-slate-100
        "
      >
        <h1
          className="
          text-xl
          font-semibold
          text-blue-700
          "
        >
          Loading...
        </h1>
      </div>
    )
  }


  // -------------------------
  // LOGIN SCREEN
  // -------------------------
  if (!user) {

    return (
      <div
        className="
        min-h-screen
        bg-gradient-to-br
        from-slate-100
        via-blue-50
        to-indigo-100
        "
      >

        <Navbar />

        <div
          className="
          flex
          items-center
          justify-center
          h-[80vh]
          px-6
          "
        >

          <div
            className="
            bg-white/80
            backdrop-blur-lg
            rounded-3xl
            shadow-2xl
            border
            border-white/30
            p-10
            max-w-lg
            text-center
            "
          >

            <h1
              className="
              text-4xl
              font-bold
              text-blue-700
              mb-4
              "
            >
              Financial News AI
            </h1>

            <p
              className="
              text-gray-600
              text-lg
              leading-relaxed
              "
            >
              Sign in with Google
              to analyze companies
              and access your
              personal history.
            </p>

          </div>

        </div>

      </div>
    )
  }


  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-slate-100
      via-blue-50
      to-indigo-100
      "
    >

      <Navbar />

      <div
        className="
        max-w-7xl
        mx-auto
        p-6
        "
      >

        <SearchBar
          onSearch={
            fetchCompany
          }
          onCompare={
            compareCompanies
          }
        />

        <div
          className="
          grid
          lg:grid-cols-4
          gap-6
          mt-8
          "
        >

          <div
            className="
            lg:col-span-1
            "
          >

            <HistorySidebar
              user={user}
              onSelectCompany={
                fetchCompany
              }
              refreshTrigger={
                refreshHistory
              }
            />

          </div>

          <div
            className="
            lg:col-span-3
            "
          >

            {/* LOADING */}
{loading && (
  <div
    className="
    flex
    justify-center
    items-center
    mt-10
    "
  >
    <div
      className="
      bg-white/80
      backdrop-blur-lg
      px-8
      py-5
      rounded-3xl
      shadow-xl
      border
      border-white/30
      "
    >
      <p
        className="
        text-lg
        font-semibold
        text-blue-600
        animate-pulse
        "
      >
        Analyzing
        Financial
        News...
      </p>
    </div>
  </div>
)}

            {data && (
              <>
                <KPISection
                  data={data}
                />

                <StockChart
                  data={
                    data.stock_chart
                  }
                  company={
                    data.company
                  }
                />

                <AIExplanationCard
                  data={data}
                />

                <div
                  className="
                  grid
                  md:grid-cols-2
                  gap-6
                  mt-8
                  "
                >
                  <CompanyCard
                    data={data}
                  />

                  <ConfidenceChart
                    score={
                      data.confidence_score
                    }
                  />

                  <InsightCard
                    insight={
                      data.insight
                    }
                  />

                  <SentimentGauge
                    sentiment={
                      data.sentiment
                    }
                  />

                  <div
                    className="
                    md:col-span-2
                    "
                  >
                    <NewsList
                      news={
                        data.news
                      }
                    />
                  </div>
                </div>
              </>
            )}

            {compareData && (
              <ComparisonTable
                company1={
                  compareData.company_1
                }
                company2={
                  compareData.company_2
                }
                winner={
                  compareData.winner
                }
                comparisonReason={
                  compareData.comparison_reason
                }
              />
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
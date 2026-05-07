//+------------------------------------------------------------------+
//|                                       RSI_Scalping_Bot_v1.6.mq5 |
//|                                          RSI Scalping Bot v1.6   |
//|                                  Pair: XAUUSD | Timeframe: M1    |
//+------------------------------------------------------------------+
#property copyright   "RSI Scalping Bot"
#property version     "1.6"
#property description "RSI Scalping Bot v1.6 - XAUUSD M1"

#include <Trade\Trade.mqh>
CTrade trade;

//--- Input Parameters
input int    RSI_Period       = 7;      // RSI Period
input double RSI_BuyEntry     = 25.0;  // Entry BUY jika RSI <= (candle tutup)
input double RSI_BuyTP        = 70.0;  // TP BUY jika RSI >= (setiap tick)
input double RSI_SellEntry    = 80.0;  // Entry SELL jika RSI >= (candle tutup)
input double RSI_SellTP       = 35.0;  // TP SELL jika RSI <= (setiap tick)
input double HardSL_Points    = 100.0; // Hard SL jarak dari entry (poin = $10 harga)
input double FixedLot         = 0.01;  // Lot fixed
input double MaxDailyLoss     = 2.0;   // Max loss harian ($)
input int    SessionStartHour = 3;     // Sesi mulai (UTC) = 10:00 WIB
input int    SessionEndHour   = 17;    // Sesi selesai (UTC) = 24:00 WIB
input bool   UseSessionFilter = true;  // Gunakan filter sesi
input long   MagicNumber      = 20250101; // Magic Number

//--- Global Variables
double   dailyLoss      = 0.0;
bool     botStopped     = false;
datetime lastResetDay   = 0;
datetime lastBarTime    = 0;
int      rsiHandle      = INVALID_HANDLE;

//+------------------------------------------------------------------+
//| Expert initialization                                            |
//+------------------------------------------------------------------+
int OnInit()
{
   trade.SetExpertMagicNumber(MagicNumber);
   trade.SetDeviationInPoints(30);

   // Buat handle RSI di M1
   rsiHandle = iRSI(_Symbol, PERIOD_M1, RSI_Period, PRICE_CLOSE);
   if(rsiHandle == INVALID_HANDLE)
   {
      Print("ERROR: Gagal membuat RSI handle!");
      return INIT_FAILED;
   }

   Print("========================================");
   Print("RSI Scalping Bot v1.6 - Berhasil diinisialisasi!");
   Print("Pair     : ", _Symbol);
   Print("TF Entry : M1 | Hard SL aktif");
   Print("Magic    : ", MagicNumber);
   Print("Max Loss : $", MaxDailyLoss);
   Print("MA200    : DIMATIKAN");
   Print("Entry    : Candle tutup | TP: Setiap tick | SL: Hard stop harga");
   Print("========================================");

   return INIT_SUCCEEDED;
}

//+------------------------------------------------------------------+
//| Expert deinitialization                                          |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   if(rsiHandle != INVALID_HANDLE) IndicatorRelease(rsiHandle);
}

//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
{
   // Reset harian
   CheckDailyReset();

   // Cek bot stop
   if(botStopped) return;

   // Cek sesi trading
   if(UseSessionFilter && !IsSessionActive()) return;

   // --- KELOLA POSISI YANG SUDAH ADA (setiap tick) ---
   if(HasOpenPosition())
   {
      ManageOpenPosition();
      return;
   }

   // --- CEK ENTRY BARU (hanya saat candle tutup) ---
   datetime currentBarTime = iTime(_Symbol, PERIOD_M1, 0);
   if(currentBarTime == lastBarTime) return;
   lastBarTime = currentBarTime;

   // Ambil RSI candle yang sudah tutup (index 1)
   double rsiBuffer[2];
   if(CopyBuffer(rsiHandle, 0, 0, 2, rsiBuffer) < 2) return;
   double rsiClosed = rsiBuffer[1];

   // Cek max daily loss sebelum entry
   if(dailyLoss >= MaxDailyLoss)
   {
      if(!botStopped)
      {
         botStopped = true;
         Print("=== BOT AUTO-STOP: Daily loss $", DoubleToString(dailyLoss, 2), " >= $", MaxDailyLoss, " ===");
      }
      return;
   }

   double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);

   // === SIGNAL BUY ===
   if(rsiClosed <= RSI_BuyEntry)
   {
      double slPrice = ask - (HardSL_Points * point);
      Print(">>> SIGNAL BUY | RSI=", DoubleToString(rsiClosed, 2),
            " | Ask=", ask, " | SL=", DoubleToString(slPrice, 2));
      if(trade.Buy(FixedLot, _Symbol, ask, slPrice, 0, "RSI_BUY_v1.6"))
         Print("BUY berhasil! Lot=", FixedLot, " | Hard SL=", DoubleToString(slPrice, 2));
      else
         Print("BUY GAGAL. Error=", GetLastError());
      return;
   }

   // === SIGNAL SELL ===
   if(rsiClosed >= RSI_SellEntry)
   {
      double slPrice = bid + (HardSL_Points * point);
      Print(">>> SIGNAL SELL | RSI=", DoubleToString(rsiClosed, 2),
            " | Bid=", bid, " | SL=", DoubleToString(slPrice, 2));
      if(trade.Sell(FixedLot, _Symbol, bid, slPrice, 0, "RSI_SELL_v1.6"))
         Print("SELL berhasil! Lot=", FixedLot, " | Hard SL=", DoubleToString(slPrice, 2));
      else
         Print("SELL GAGAL. Error=", GetLastError());
      return;
   }
}

//+------------------------------------------------------------------+
//| Kelola posisi yang sudah terbuka (setiap tick)                   |
//+------------------------------------------------------------------+
void ManageOpenPosition()
{
   // Ambil RSI real-time (index 0 = candle sedang berjalan)
   double rsiBuffer[1];
   if(CopyBuffer(rsiHandle, 0, 0, 1, rsiBuffer) < 1) return;
   double rsiNow = rsiBuffer[0];

   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      ulong ticket = PositionGetTicket(i);
      if(!PositionSelectByTicket(ticket)) continue;
      if(PositionGetInteger(POSITION_MAGIC) != MagicNumber) continue;
      if(PositionGetString(POSITION_SYMBOL) != _Symbol) continue;

      ENUM_POSITION_TYPE posType = (ENUM_POSITION_TYPE)PositionGetInteger(POSITION_TYPE);
      double profit = PositionGetDouble(POSITION_PROFIT);

      if(posType == POSITION_TYPE_BUY)
      {
         // TP BUY: RSI >= 70 (setiap tick)
         if(rsiNow >= RSI_BuyTP)
         {
            Print("<<< CLOSE BUY (TP) | RSI=", DoubleToString(rsiNow, 2),
                  " | Profit=$", DoubleToString(profit, 2));
            if(trade.PositionClose(ticket))
               UpdateDailyLoss(profit);
         }
      }
      else if(posType == POSITION_TYPE_SELL)
      {
         // TP SELL: RSI <= 35 (setiap tick)
         if(rsiNow <= RSI_SellTP)
         {
            Print("<<< CLOSE SELL (TP) | RSI=", DoubleToString(rsiNow, 2),
                  " | Profit=$", DoubleToString(profit, 2));
            if(trade.PositionClose(ticket))
               UpdateDailyLoss(profit);
         }
      }
   }
}

//+------------------------------------------------------------------+
//| Update daily loss tracker                                        |
//+------------------------------------------------------------------+
void UpdateDailyLoss(double profit)
{
   if(profit < 0)
   {
      dailyLoss += MathAbs(profit);
      Print("Daily loss update: $", DoubleToString(dailyLoss, 2), " / $", MaxDailyLoss);
   }

   if(dailyLoss >= MaxDailyLoss)
   {
      botStopped = true;
      Print("=== BOT AUTO-STOP: Daily loss $", DoubleToString(dailyLoss, 2), " ===");
   }
}

//+------------------------------------------------------------------+
//| Cek apakah ada posisi terbuka dengan magic ini                   |
//+------------------------------------------------------------------+
bool HasOpenPosition()
{
   for(int i = 0; i < PositionsTotal(); i++)
   {
      ulong ticket = PositionGetTicket(i);
      if(!PositionSelectByTicket(ticket)) continue;
      if(PositionGetInteger(POSITION_MAGIC) == MagicNumber &&
         PositionGetString(POSITION_SYMBOL) == _Symbol)
         return true;
   }
   return false;
}

//+------------------------------------------------------------------+
//| Cek apakah sesi trading aktif                                    |
//+------------------------------------------------------------------+
bool IsSessionActive()
{
   MqlDateTime timeNow;
   TimeToStruct(TimeGMT(), timeNow);
   int currentHour = timeNow.hour;

   if(SessionStartHour < SessionEndHour)
      return (currentHour >= SessionStartHour && currentHour < SessionEndHour);
   else
      return (currentHour >= SessionStartHour || currentHour < SessionEndHour);
}

//+------------------------------------------------------------------+
//| Reset loss counter setiap hari baru                              |
//+------------------------------------------------------------------+
void CheckDailyReset()
{
   MqlDateTime timeNow;
   TimeToStruct(TimeGMT(), timeNow);

   datetime today = StringToTime(
      IntegerToString(timeNow.year) + "." +
      IntegerToString(timeNow.mon)  + "." +
      IntegerToString(timeNow.day)
   );

   if(today > lastResetDay)
   {
      dailyLoss    = 0.0;
      botStopped   = false;
      lastResetDay = today;
      Print("--- Reset loss harian. Bot aktif kembali. Tanggal: ",
            IntegerToString(timeNow.day), "/", IntegerToString(timeNow.mon));
   }
}
//+------------------------------------------------------------------+

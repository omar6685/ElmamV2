import tkinter as tk
from tkinter import font
from tkinter import messagebox
from math import log, ceil


class NitaqatApplication:

    def __init__(self):
        self.root = tk.Tk()
        self.root.title("نطاقات")
        self.root.geometry("1400x650")
        self.initialize_widgets()
        self.calculate()
        self.root.configure(bg='ivory1')
        # self.bind_events()

    def initialize_widgets(self):
        #  groupBox1
        group_box1 = tk.LabelFrame(
            self.root, text="الاعدادات", padx=10, pady=10)
        # Positioning and sizing the group box
        group_box1.place(x=16, y=15, width=659, height=220)

        label7 = tk.Label(group_box1, text="القيمة الثابتة للمنحنى")
        label7.place(x=225, y=31)
        # txtFixedCurveValuePlatinium
        self.txtFixedCurveValuePlatinium = tk.Entry(
            group_box1, justify='center')
        self.txtFixedCurveValuePlatinium.place(x=225, y=166, width=132)
        self.txtFixedCurveValuePlatinium.insert(0, "2.08")

        # txtFixedCurveValueHighGreen
        self.txtFixedCurveValueHighGreen = tk.Entry(
            group_box1, justify='center')
        self.txtFixedCurveValueHighGreen.place(x=225, y=133, width=132)
        self.txtFixedCurveValueHighGreen.insert(0, "2.08")

        # txtFixedCurveValueMidGreen
        self.txtFixedCurveValueMidGreen = tk.Entry(
            group_box1, justify='center')
        self.txtFixedCurveValueMidGreen.place(x=225, y=95, width=132)
        self.txtFixedCurveValueMidGreen.insert(0, "1.87")

        # txtFixedCurveValueLowGreen
        self.txtFixedCurveValueLowGreen = tk.Entry(
            group_box1, justify='center')
        self.txtFixedCurveValueLowGreen.place(x=225, y=62, width=132)
        self.txtFixedCurveValueLowGreen.insert(0, "1.68")
        # label6
        label6 = tk.Label(group_box1, text="الحد الأدنى للنطاق")
        label6.place(x=28, y=31)

        # label5
        label5 = tk.Label(group_box1, text="القيمة الثابتة للسنة")
        label5.place(x=413, y=31)

        custom_font = font.Font(family="Helvetica", size=10, weight="bold")

        # txtMinimumRequirePlatinium
        self.txtMinimumRequirePlatinium = tk.Entry(
            group_box1, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtMinimumRequirePlatinium.place(x=28, y=166, width=132)

        # txtMinimumRequireHighGreen
        self.txtMinimumRequireHighGreen = tk.Entry(
            group_box1, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtMinimumRequireHighGreen.place(x=28, y=133, width=132)

        # txtMinimumRequireMidGreen
        self.txtMinimumRequireMidGreen = tk.Entry(
            group_box1, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtMinimumRequireMidGreen.place(x=28, y=95, width=132)

        # txtMinimumRequireLowGreen
        self.txtMinimumRequireLowGreen = tk.Entry(
            group_box1, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtMinimumRequireLowGreen.place(x=28, y=62, width=132)

        # txtFixedValuePlatinium
        self.txtFixedValuePlatinium = tk.Entry(group_box1, justify='center')
        self.txtFixedValuePlatinium.place(x=413, y=166, width=132)
        self.txtFixedValuePlatinium.insert(0, "28.37")

        # txtFixedHighGreen
        self.txtFixedHighGreen = tk.Entry(group_box1, justify='center')
        self.txtFixedHighGreen.place(x=413, y=133, width=132)
        self.txtFixedHighGreen.insert(0, "22.47")

        # txtFixedValueMidGreen
        self.txtFixedValueMidGreen = tk.Entry(group_box1, justify='center')
        self.txtFixedValueMidGreen.place(x=413, y=95, width=132)
        self.txtFixedValueMidGreen.insert(0, "18.87")

        # txtFixedValueLowGreen
        self.txtFixedValueLowGreen = tk.Entry(group_box1, justify='center')
        self.txtFixedValueLowGreen.place(x=413, y=62, width=132)
        self.txtFixedValueLowGreen.insert(0, "12.08")

        # label4
        label4 = tk.Label(group_box1, text="بلاتيني")
        label4.place(x=555, y=166)

        # label3
        label3 = tk.Label(group_box1, text="اخضر مرتفع")
        label3.place(x=555, y=133)

        # label2
        label2 = tk.Label(group_box1, text="اخضر متوسط")
        label2.place(x=555, y=95)

        # label1
        label1 = tk.Label(group_box1, text="اخضر منخفض")
        label1.place(x=555, y=62)

        # groupBox2
        group_box2 = tk.LabelFrame(
            self.root, text="عدد الموظفين في المنشأة", padx=10, pady=10)
        group_box2.place(x=16, y=253, width=659, height=200)

        # txtNitaq
        self.txtNitaq = tk.Entry(
            group_box2, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtNitaq.place(x=24, y=114, width=152)

        # label10
        label10 = tk.Label(group_box2, text="معامل نسبة التوطين")
        label10.place(x=185, y=81)

        # txtSaudizm
        self.txtSaudizm = tk.Entry(
            group_box2, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtSaudizm.place(x=24, y=79, width=152)

        self.txtNitaqColor = tk.Label(
            group_box2, width=3, borderwidth=1, relief="groove")
        self.txtNitaqColor.place(x=179, y=114, width=27, height=22)

        # label9
        label9 = tk.Label(group_box2, text="النطاق")
        label9.place(x=215, y=119)

        # label8
        label8 = tk.Label(group_box2, text="الاجمالي")
        label8.place(x=555, y=117)

        # txtTotal
        self.txtTotal = tk.Entry(
            group_box2, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtTotal.place(x=413, y=113, width=132)

        # txtForigner
        self.txtForigner = tk.Entry(group_box2, justify='center')
        self.txtForigner.place(x=413, y=81, width=132)
        self.txtForigner.insert(0, "10")
        self.txtForigner.bind("<KeyRelease>", self.calculate)

        # txtSaudi
        self.txtSaudi = tk.Entry(group_box2, justify='center')
        self.txtSaudi.place(x=413, y=48, width=132)
        self.txtSaudi.insert(0, "1")
        self.txtSaudi.bind("<KeyRelease>", self.calculate)

        # label13
        label13 = tk.Label(group_box2, text="اجانب")
        label13.place(x=555, y=85)

        # label14
        label14 = tk.Label(group_box2, text="سعوديين")
        label14.place(x=555, y=48)

        # groupBox3
        group_box3 = tk.LabelFrame(
            self.root, text="الى الأخضر المنخفض", padx=10, pady=10)
        group_box3.place(x=708, y=15, width=650, height=89)
        labelLowGreenCol = tk.Label(
            group_box3, text="                   ", bg="aquamarine1")
        labelLowGreenCol.place(x=-5, y=-7)

        # txtForignerToLowGreen
        self.txtForignerToLowGreen = tk.Entry(
            group_box3, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtForignerToLowGreen.place(x=77, y=15, width=132)

        # txtSaudiToLowGreen
        self.txtSaudiToLowGreen = tk.Entry(
            group_box3, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtSaudiToLowGreen.place(x=365, y=15, width=132)

        # label16
        label16 = tk.Label(group_box3, text="اجانب")
        label16.place(x=219, y=15)

        # label17
        label17 = tk.Label(group_box3, text="سعوديين")
        label17.place(x=507, y=15)

        # groupBox4
        group_box4 = tk.LabelFrame(
            self.root, text="الى الأخضر المتوسط", padx=10, pady=10)
        group_box4.place(x=708, y=130, width=650, height=89)
        labelMidGreenCol = tk.Label(
            group_box4, text="                   ", bg="chartreuse1")
        labelMidGreenCol.place(x=-5, y=-7)

        # txtForignerToMidGreen
        self.txtForignerToMidGreen = tk.Entry(
            group_box4, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtForignerToMidGreen.place(x=77, y=0, width=132)

        # txtSaudiToMidGreen
        self.txtSaudiToMidGreen = tk.Entry(
            group_box4, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtSaudiToMidGreen.place(x=365, y=0, width=132)

        # label11
        label11 = tk.Label(group_box4, text="اجانب")
        label11.place(x=219, y=0)

        # label12
        label12 = tk.Label(group_box4, text="سعوديين")
        label12.place(x=507, y=0)

        # labelp12
        labelp12 = tk.Label(group_box4, text="سيكون رصيد الاستقطاب")
        labelp12.place(x=505, y=24)

        # labelp15
        labelp11 = tk.Label(group_box4, text="سيكون رصيد الاستقطاب")
        labelp11.place(x=219, y=24)

        # txtRasidIfSauditoHiGreen
        self.txtRasidIfSauditoMidGreen = tk.Entry(
            group_box4, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtRasidIfSauditoMidGreen.place(x=365, y=24, width=132)

        # txtRasidIfForignertoHiGreen
        self.txtRasidIfForignertoMidGreen = tk.Entry(
            group_box4, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtRasidIfForignertoMidGreen.place(x=77, y=24, width=132)

        # groupBox5
        group_box5 = tk.LabelFrame(
            self.root, text="الى الأخضر المرتفع", padx=10, pady=10)
        group_box5.place(x=708, y=246, width=650, height=89)
        labelHiGreenCol = tk.Label(
            group_box5, text="                   ", bg="chartreuse4")
        labelHiGreenCol.place(x=-5, y=-7)

        # txtForignerToHighGreen
        self.txtForignerToHighGreen = tk.Entry(
            group_box5, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtForignerToHighGreen.place(x=77, y=0, width=132)

        # txtSaudiToHighGreen
        self.txtSaudiToHighGreen = tk.Entry(
            group_box5, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtSaudiToHighGreen.place(x=365, y=0, width=132)

        # label15
        label15 = tk.Label(group_box5, text="اجانب")
        label15.place(x=219, y=0)

        # labelp18
        labelp18 = tk.Label(group_box5, text="سيكون رصيد الاستقطاب")
        labelp18.place(x=505, y=24)

        # label18
        label18 = tk.Label(group_box5, text="سعوديين")
        label18.place(x=507, y=0)

        # labelp15
        labelp15 = tk.Label(group_box5, text="سيكون رصيد الاستقطاب")
        labelp15.place(x=219, y=24)

        # txtRasidIfSauditoHiGreen
        self.txtRasidIfSauditoHiGreen = tk.Entry(
            group_box5, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtRasidIfSauditoHiGreen.place(x=365, y=24, width=132)

        # txtRasidIfForignertoHiGreen
        self.txtRasidIfForignertoHiGreen = tk.Entry(
            group_box5, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtRasidIfForignertoHiGreen.place(x=77, y=24, width=132)

        # groupBox6
        group_box6 = tk.LabelFrame(
            self.root, text="الى البلاتيني", padx=10, pady=10)
        group_box6.place(x=708, y=364, width=650, height=89)
        labelPlatCol = tk.Label(
            group_box6, text="                   ", bg="darkseagreen4")
        labelPlatCol.place(x=-5, y=-7)

        # txtForignerToPlatinuim
        self.txtForignerToPlatinuim = tk.Entry(
            group_box6, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtForignerToPlatinuim.place(x=77, y=0, width=132)

        # txtSaudiToPlatinuim
        self.txtSaudiToPlatinuim = tk.Entry(
            group_box6, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtSaudiToPlatinuim.place(x=365, y=0, width=132)

        # label19
        label19 = tk.Label(group_box6, text="اجانب")
        label19.place(x=219, y=0)

        # label20
        label20 = tk.Label(group_box6, text="سعوديين")
        label20.place(x=507, y=0)

        # labelp19
        labelp19 = tk.Label(group_box6, text="سيكون رصيد الاستقطاب")
        labelp19.place(x=505, y=25)


        # labelp20
        labelp20 = tk.Label(group_box6, text="سيكون رصيد الاستقطاب")
        labelp20.place(x=219, y=24)

        # txtRasidIfSauditoHiGreen
        self.txtRasidIfSauditoPlat = tk.Entry(
            group_box6, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtRasidIfSauditoPlat.place(x=365, y=24, width=132)

        # txtRasidIfForignertoHiGreen
        self.txtRasidIfForignertoPlat = tk.Entry(
            group_box6, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtRasidIfForignertoPlat.place(x=77, y=24, width=132)


        group_box7 = tk.LabelFrame(
            self.root, text="إضافات", padx=10, pady=10)
        group_box7.place(x=390, y=460, width=700, height=180)

        label22 = tk.Label(
            group_box7, text="عدد الأجانب المسموح اضافتهم دون النزول عن النطاق الحالي")
        label22.place(x=300, y=10)

        # txtMaxForigner عدد الأجانب المسموح اضافتهم دون النزول عن النطاق الحال
        self.txtMaxForigner = tk.Entry(
            group_box7, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtMaxForigner.place(x=150, y=10, width=132)
        self.txtMaxForigner.insert(
            0, "0")
        self.txtMaxForigner.bind("<KeyRelease>", self.calculate)

        # Label Saudi to substract
        label23 = tk.Label(
            group_box7, text="  عدد السعوديين المسموح استبعادهم دون النزول عن النطاق الحالي")
        label23.place(x=300, y=40)

        # txtMaxSaudi عدد السعوديين المسموح استبعادهم دون النزول عن النطاق الحال
        self.txtMaxSaudi = tk.Entry(
            group_box7, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtMaxSaudi.place(x=150, y=40, width=132)
        self.txtMaxSaudi.insert(
            0, "0")
        self.txtMaxSaudi.bind("<KeyRelease>", self.calculate)

        # Rasid Iste9tab
        label24 = tk.Label(group_box7, text="رصيد الاستقطاب")
        label24.place(x=300, y=65)

        # txtForegnerizm رصيد الاستقطاب"
        self.txtForignerizm = tk.Entry(
            group_box7, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtForignerizm.place(x=150, y=65, width=132)
        self.txtForignerizm.insert(
            0, "0")
        self.txtForignerizm.bind("<KeyRelease>", self.calculate)

        # Saudi to eliminate to lower green
        label25 = tk.Label(
            group_box7, text="عدد السعوديين المسوح استبعادهم دون النزول عن النطاق الاخضر المنخفض")
        label25.place(x=300, y=95)

        # txtEliminateSaudiToLowGreen  عدد السعوديين المسوح استبعادهم دون النزول عن النطاق الاخضر المنخفض"
        self.txtEliminateSaudiToLowGreen = tk.Entry(
            group_box7, state='disabled', font=custom_font, fg="white", bg="black", justify='center')
        self.txtEliminateSaudiToLowGreen.place(x=150, y=95, width=132)
        self.txtEliminateSaudiToLowGreen.insert(
            0, "0")
        self.txtEliminateSaudiToLowGreen.bind("<KeyRelease>", self.calculate)

    def calculate(self, event=None):

        try:
            # Employes Counters
            saudiEmp = float(self.txtSaudi.get())
            forignerEmp = float(self.txtForigner.get())
            totalEmp = saudiEmp + forignerEmp
            self.txtTotal.config(state=tk.NORMAL)
            self.txtTotal.delete(0, tk.END)
            self.txtTotal.insert(0, f"{totalEmp}")
            self.txtTotal.config(state=tk.DISABLED)
            self.root.update()

            # Saudizm Calculation
            saudizm = self.get_saudizm(saudiEmp, totalEmp)
            self.txtSaudizm.config(state=tk.NORMAL)
            self.txtSaudizm.delete(0, tk.END)
            self.txtSaudizm.insert(0, f"{saudizm:.2f}")
            self.txtSaudizm.config(state=tk.DISABLED)

            # Calculate Minimum Requirements
            self.calculate_minimum_requirements(totalEmp)
            self.root.update()

            # Extract the calculated minimum requirements
            minLowGreen = float(self.txtMinimumRequireLowGreen.get())
            minMidGreen = float(self.txtMinimumRequireMidGreen.get())
            minHiGreen = float(self.txtMinimumRequireHighGreen.get())
            minPlatinium = float(self.txtMinimumRequirePlatinium.get())

            # Nitaq Calculation
            nitaq_level, nitaq_color = self.get_nitaq(
                saudizm, minLowGreen, minMidGreen, minHiGreen, minPlatinium)
            self.txtNitaq.config(state=tk.NORMAL)
            self.txtNitaq.delete(0, tk.END)
            self.txtNitaq.insert(0, nitaq_level)
            self.txtNitaq.config(state=tk.DISABLED)
            self.txtNitaqColor.config(bg=nitaq_color)

            # Calculate minimum Saudi addition and foreigner subtraction counts TO LOW GREEN
            FixedCurveValueLowGreen = float(
                self.txtFixedCurveValueLowGreen.get())
            FixedValueLowGreen = float(self.txtFixedValueLowGreen.get())
            minimumSaudiCount = self.get_minimum_saudi_addition_count(
                FixedCurveValueLowGreen, FixedValueLowGreen, saudiEmp, totalEmp)
            maxForignerCount = self.get_minimum_forigner_subtraction_count(
                FixedCurveValueLowGreen, FixedValueLowGreen, saudiEmp, totalEmp)

            self.txtSaudiToLowGreen.config(state=tk.NORMAL)
            self.txtSaudiToLowGreen.delete(0, tk.END)
            self.txtSaudiToLowGreen.insert(0, f"+ {minimumSaudiCount}")
            self.txtSaudiToLowGreen.config(state=tk.DISABLED)

            self.txtForignerToLowGreen.config(state=tk.NORMAL)
            self.txtForignerToLowGreen.delete(0, tk.END)
            self.txtForignerToLowGreen.insert(0, f"- {maxForignerCount}")
            self.txtForignerToLowGreen.config(state=tk.DISABLED)

            # Calculate minimum Saudi addition and foreigner subtraction counts TO MID GREEN
            FixedCurveValueMidGreen = float(
                self.txtFixedCurveValueMidGreen.get())
            FixedValueMidGreen = float(self.txtFixedValueMidGreen.get())
            minimumSaudiCount = self.get_minimum_saudi_addition_count(
                FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp)
            maxForignerCount = self.get_minimum_forigner_subtraction_count(
                FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp)

            self.txtSaudiToMidGreen.config(state=tk.NORMAL)
            self.txtSaudiToMidGreen.delete(0, tk.END)
            self.txtSaudiToMidGreen.insert(0, f"+ {minimumSaudiCount}")
            self.txtSaudiToMidGreen.config(state=tk.DISABLED)

            self.txtForignerToMidGreen.config(state=tk.NORMAL)
            self.txtForignerToMidGreen.delete(0, tk.END)
            self.txtForignerToMidGreen.insert(0, f"- {maxForignerCount}")
            self.txtForignerToMidGreen.config(state=tk.DISABLED)

            # Calculate minimum Saudi addition and foreigner subtraction counts TO HIGH GREEN
            FixedCurveValueHiGreen = float(
                self.txtFixedCurveValueHighGreen.get())
            FixedValueHiGreen = float(self.txtFixedHighGreen.get())
            minimumSaudiCount = self.get_minimum_saudi_addition_count(
                FixedCurveValueHiGreen, FixedValueHiGreen, saudiEmp, totalEmp)
            maxForignerCount = self.get_minimum_forigner_subtraction_count(
                FixedCurveValueHiGreen, FixedValueHiGreen, saudiEmp, totalEmp)


            self.txtSaudiToHighGreen.config(state=tk.NORMAL)
            self.txtSaudiToHighGreen.delete(0, tk.END)
            self.txtSaudiToHighGreen.insert(0, f"+ {minimumSaudiCount}")
            self.txtSaudiToHighGreen.config(state=tk.DISABLED)

            self.txtForignerToHighGreen.config(state=tk.NORMAL)
            self.txtForignerToHighGreen.delete(0, tk.END)
            self.txtForignerToHighGreen.insert(0, f"- {maxForignerCount}")
            self.txtForignerToHighGreen.config(state=tk.DISABLED)

            # Calculate minimum Saudi addition and foreigner subtraction counts TO PLATINIUM
            FixedCurveValuePlatinium = float(
                self.txtFixedCurveValuePlatinium.get())
            FixedValuePlatinium = float(self.txtFixedValuePlatinium.get())
            minimumSaudiCount = self.get_minimum_saudi_addition_count(
                FixedCurveValuePlatinium, FixedValuePlatinium, saudiEmp, totalEmp)
            maxForignerCount = self.get_minimum_forigner_subtraction_count(
                FixedCurveValuePlatinium, FixedValuePlatinium, saudiEmp, totalEmp)

            self.txtSaudiToPlatinuim.config(state=tk.NORMAL)
            self.txtSaudiToPlatinuim.delete(0, tk.END)
            self.txtSaudiToPlatinuim.insert(0, f"+ {minimumSaudiCount}")
            self.txtSaudiToPlatinuim.config(state=tk.DISABLED)

            self.txtForignerToPlatinuim.config(state=tk.NORMAL)
            self.txtForignerToPlatinuim.delete(0, tk.END)
            self.txtForignerToPlatinuim.insert(0, f"- {maxForignerCount}")
            self.txtForignerToPlatinuim.config(state=tk.DISABLED)

            # MAX Forigner to add :
            max_forigner_to_add = 0
            max_saudi_to_substract = 0
            max_forigner_to_mid_green = 0
            max_saudi_to_sub_to_low_green = 0
            if nitaq_level == "احمر":
                max_forigner_to_add = 0
                max_saudi_to_substract = 0

                #  What is the Rasid if we substract FORIGNER to go to the MID green :
                maxForignerCount = self.get_minimum_forigner_subtraction_count(
                FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp)
                RasidIfForignertoMidGreen =  self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp-maxForignerCount)
                self.txtRasidIfForignertoMidGreen.config(state=tk.NORMAL)
                self.txtRasidIfForignertoMidGreen.delete(0, tk.END)
                self.txtRasidIfForignertoMidGreen.insert(0, f"{RasidIfForignertoMidGreen}")
                self.txtRasidIfForignertoMidGreen.config(state=tk.DISABLED)

                # What is the Rasid id we add SAUDIS to go to MID green
                minimumSaudiCount = self.get_minimum_saudi_addition_count(
                FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp)
                RasidIfSaudistoMidGreen = self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp + minimumSaudiCount, totalEmp+ minimumSaudiCount)
                self.txtRasidIfSauditoMidGreen.config(state=tk.NORMAL)
                self.txtRasidIfSauditoMidGreen.delete(0, tk.END)
                self.txtRasidIfSauditoMidGreen.insert(0, f"{RasidIfSaudistoMidGreen}")
                self.txtRasidIfSauditoMidGreen.config(state=tk.DISABLED)

                #  What is the Rasid if we substract FORIGNER to go to the High green :
                maxForignerCount = self.get_minimum_forigner_subtraction_count(
                FixedCurveValueHiGreen, FixedValueHiGreen, saudiEmp, totalEmp)
                RasidIfForignertoHiGreen =  self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp-maxForignerCount)
                self.txtRasidIfForignertoHiGreen.config(state=tk.NORMAL)
                self.txtRasidIfForignertoHiGreen.delete(0, tk.END)
                self.txtRasidIfForignertoHiGreen.insert(0, f"{RasidIfForignertoHiGreen}")
                self.txtRasidIfForignertoHiGreen.config(state=tk.DISABLED)

                # What is the Rasid id we add SAUDIS to go to High green
                minimumSaudiCount = self.get_minimum_saudi_addition_count(
                FixedCurveValueHiGreen, FixedValueHiGreen, saudiEmp, totalEmp)
                RasidIfSaudistoHiGreen = self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp + minimumSaudiCount, totalEmp+ minimumSaudiCount)
                self.txtRasidIfSauditoHiGreen.config(state=tk.NORMAL)
                self.txtRasidIfSauditoHiGreen.delete(0, tk.END)
                self.txtRasidIfSauditoHiGreen.insert(0, f"{RasidIfSaudistoHiGreen}")
                self.txtRasidIfSauditoHiGreen.config(state=tk.DISABLED)

                #  What is the Rasid if we substract FORIGNER to go to the PLATINIUM green :
                maxForignerCount = self.get_minimum_forigner_subtraction_count(
                FixedCurveValuePlatinium, FixedValuePlatinium, saudiEmp, totalEmp)
                RasidIfForignertoPlat =  self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp-maxForignerCount)
                self.txtRasidIfForignertoPlat.config(state=tk.NORMAL)
                self.txtRasidIfForignertoPlat.delete(0, tk.END)
                self.txtRasidIfForignertoPlat.insert(0, f"{RasidIfForignertoPlat}")
                self.txtRasidIfForignertoPlat.config(state=tk.DISABLED)

                # What is the Rasid id we add SAUDIS to go to PLATINIUM green
                minimumSaudiCount = self.get_minimum_saudi_addition_count(
                FixedCurveValuePlatinium, FixedValuePlatinium, saudiEmp, totalEmp)
                RasidIfSaudistoPlat = self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp + minimumSaudiCount, totalEmp+ minimumSaudiCount)
                self.txtRasidIfSauditoPlat.config(state=tk.NORMAL)
                self.txtRasidIfSauditoPlat.delete(0, tk.END)
                self.txtRasidIfSauditoPlat.insert(0, f"{RasidIfSaudistoPlat}")
                self.txtRasidIfSauditoPlat.config(state=tk.DISABLED)


            if nitaq_level == "أخضر منخفض":
                max_forigner_to_add = 0
                max_saudi_to_substract = self.get_max_saudi_substraction_count(
                    FixedCurveValueLowGreen, FixedValueLowGreen, saudiEmp, totalEmp)
                max_saudi_to_sub_to_low_green = self.get_max_saudi_substraction_count(
                    FixedCurveValueLowGreen, FixedValueLowGreen, saudiEmp, totalEmp)

                #  What is the Rasid if we substract FORIGNER to go to the MID green :
                maxForignerCount = self.get_minimum_forigner_subtraction_count(
                FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp)
                RasidIfForignertoMidGreen =  self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp-maxForignerCount)
                self.txtRasidIfForignertoMidGreen.config(state=tk.NORMAL)
                self.txtRasidIfForignertoMidGreen.delete(0, tk.END)
                self.txtRasidIfForignertoMidGreen.insert(0, f"{RasidIfForignertoMidGreen}")
                self.txtRasidIfForignertoMidGreen.config(state=tk.DISABLED)

                # What is the Rasid id we add SAUDIS to go to MID green
                minimumSaudiCount = self.get_minimum_saudi_addition_count(
                FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp)
                RasidIfSaudistoMidGreen = self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp + minimumSaudiCount, totalEmp+ minimumSaudiCount)
                self.txtRasidIfSauditoMidGreen.config(state=tk.NORMAL)
                self.txtRasidIfSauditoMidGreen.delete(0, tk.END)
                self.txtRasidIfSauditoMidGreen.insert(0, f"{RasidIfSaudistoMidGreen}")
                self.txtRasidIfSauditoMidGreen.config(state=tk.DISABLED)

                # What is the Rasid if we substract Forigner  to go to the HIGH  green :
                maxForignerCount = self.get_minimum_forigner_subtraction_count(
                FixedCurveValueHiGreen, FixedValueHiGreen, saudiEmp, totalEmp)
                RasidIfForignertoHiGreen = self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp-maxForignerCount)

                self.txtRasidIfForignertoHiGreen.config(state=tk.NORMAL)
                self.txtRasidIfForignertoHiGreen.delete(0, tk.END)
                self.txtRasidIfForignertoHiGreen.insert(0, f"{RasidIfForignertoHiGreen}")
                self.txtRasidIfForignertoHiGreen.config(state=tk.DISABLED)

                # What is the Rasid id we add SAUDIS to go to High green
                minimumSaudiCount = self.get_minimum_saudi_addition_count(
                FixedCurveValueHiGreen, FixedValueHiGreen, saudiEmp, totalEmp)
                RasidIfSaudistoHiGreen = self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp + minimumSaudiCount, totalEmp+ minimumSaudiCount)
                self.txtRasidIfSauditoHiGreen.config(state=tk.NORMAL)
                self.txtRasidIfSauditoHiGreen.delete(0, tk.END)
                self.txtRasidIfSauditoHiGreen.insert(0, f"{RasidIfSaudistoHiGreen}")
                self.txtRasidIfSauditoHiGreen.config(state=tk.DISABLED)

                #  What is the Rasid if we substract FORIGNER to go to the PLATINIUM green :
                maxForignerCount = self.get_minimum_forigner_subtraction_count(
                FixedCurveValuePlatinium, FixedValuePlatinium, saudiEmp, totalEmp)
                RasidIfForignertoPlat =  self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp-maxForignerCount)
                self.txtRasidIfForignertoPlat.config(state=tk.NORMAL)
                self.txtRasidIfForignertoPlat.delete(0, tk.END)
                self.txtRasidIfForignertoPlat.insert(0, f"{RasidIfForignertoPlat}")
                self.txtRasidIfForignertoPlat.config(state=tk.DISABLED)

                # What is the Rasid id we add SAUDIS to go to PLATINIUM green
                minimumSaudiCount = self.get_minimum_saudi_addition_count(
                FixedCurveValuePlatinium, FixedValuePlatinium, saudiEmp, totalEmp)
                RasidIfSaudistoPlat = self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp + minimumSaudiCount, totalEmp+ minimumSaudiCount)
                self.txtRasidIfSauditoPlat.config(state=tk.NORMAL)
                self.txtRasidIfSauditoPlat.delete(0, tk.END)
                self.txtRasidIfSauditoPlat.insert(0, f"{RasidIfSaudistoPlat}")
                self.txtRasidIfSauditoPlat.config(state=tk.DISABLED)

            if nitaq_level == "أخضر متوسط":
                max_forigner_to_add = self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp)
                max_saudi_to_substract = self.get_max_saudi_substraction_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp)
                max_forigner_to_mid_green = max_forigner_to_add
                max_saudi_to_sub_to_low_green = self.get_max_saudi_substraction_count(
                    FixedCurveValueLowGreen, FixedValueLowGreen, saudiEmp, totalEmp)

                 # What is the Rasid if we Substract FORIGNER to go to Mid GREEN 
                self.txtRasidIfForignertoMidGreen.config(state=tk.NORMAL)
                self.txtRasidIfForignertoMidGreen.delete(0, tk.END)
                self.txtRasidIfForignertoMidGreen.insert(0, f"{max_forigner_to_mid_green}")
                self.txtRasidIfForignertoMidGreen.config(state=tk.DISABLED)
                # What is the Rasid id we add SAUDIS to go to Mid GREEN
                self.txtRasidIfSauditoMidGreen.config(state=tk.NORMAL)
                self.txtRasidIfSauditoMidGreen.delete(0, tk.END)
                self.txtRasidIfSauditoMidGreen.insert(0, f"{max_forigner_to_mid_green}")
                self.txtRasidIfSauditoMidGreen.config(state=tk.DISABLED)

                # What is the Rasid id we add SAUDIS to go to High green
                minimumSaudiCount = self.get_minimum_saudi_addition_count(
                FixedCurveValueHiGreen, FixedValueHiGreen, saudiEmp, totalEmp)
                RasidIfSaudistoHiGreen = self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp + minimumSaudiCount, totalEmp+ minimumSaudiCount)
                self.txtRasidIfSauditoHiGreen.config(state=tk.NORMAL)
                self.txtRasidIfSauditoHiGreen.delete(0, tk.END)
                self.txtRasidIfSauditoHiGreen.insert(0, f"{RasidIfSaudistoHiGreen}")
                self.txtRasidIfSauditoHiGreen.config(state=tk.DISABLED)
                #  What is the Rasid id we Substract Forigner to go to High green
                maxForignerCount = self.get_minimum_forigner_subtraction_count(
                FixedCurveValueHiGreen, FixedValueHiGreen, saudiEmp, totalEmp)
                RasidIfForignertoHiGreen = self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp-maxForignerCount)
                self.txtRasidIfForignertoHiGreen.config(state=tk.NORMAL)
                self.txtRasidIfForignertoHiGreen.delete(0, tk.END)
                self.txtRasidIfForignertoHiGreen.insert(0, f"{RasidIfForignertoHiGreen}")
                self.txtRasidIfForignertoHiGreen.config(state=tk.DISABLED)

                #  What is the Rasid if we substract FORIGNER to go to the PLATINIUM green :
                maxForignerCount = self.get_minimum_forigner_subtraction_count(
                FixedCurveValuePlatinium, FixedValuePlatinium, saudiEmp, totalEmp)
                RasidIfForignertoPlat =  self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp-maxForignerCount)
                self.txtRasidIfForignertoPlat.config(state=tk.NORMAL)
                self.txtRasidIfForignertoPlat.delete(0, tk.END)
                self.txtRasidIfForignertoPlat.insert(0, f"{RasidIfForignertoPlat}")
                self.txtRasidIfForignertoPlat.config(state=tk.DISABLED)

                # What is the Rasid id we add SAUDIS to go to PLATINIUM green
                minimumSaudiCount = self.get_minimum_saudi_addition_count(
                FixedCurveValuePlatinium, FixedValuePlatinium, saudiEmp, totalEmp)
                RasidIfSaudistoPlat = self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp + minimumSaudiCount, totalEmp+ minimumSaudiCount)
                self.txtRasidIfSauditoPlat.config(state=tk.NORMAL)
                self.txtRasidIfSauditoPlat.delete(0, tk.END)
                self.txtRasidIfSauditoPlat.insert(0, f"{RasidIfSaudistoPlat}")
                self.txtRasidIfSauditoPlat.config(state=tk.DISABLED)

            if nitaq_level == "أخضر مرتفع":
                max_forigner_to_add = self.get_max_forigner_addition_count(
                    FixedCurveValueHiGreen, FixedValueHiGreen, saudiEmp, totalEmp)
                max_saudi_to_substract = self.get_max_saudi_substraction_count(
                    FixedCurveValueHiGreen, FixedValueHiGreen, saudiEmp, totalEmp)
                max_forigner_to_mid_green = self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp)
                max_saudi_to_sub_to_low_green = self.get_max_saudi_substraction_count(
                    FixedCurveValueLowGreen, FixedValueLowGreen, saudiEmp, totalEmp)

                # What is the Rasid if we Substract FORIGNER to go to Mid GREEN 
                self.txtRasidIfForignertoMidGreen.config(state=tk.NORMAL)
                self.txtRasidIfForignertoMidGreen.delete(0, tk.END)
                self.txtRasidIfForignertoMidGreen.insert(0, f"--")
                self.txtRasidIfForignertoMidGreen.config(state=tk.DISABLED)
                # What is the Rasid id we add SAUDIS to go to Mid GREEN
                self.txtRasidIfSauditoMidGreen.config(state=tk.NORMAL)
                self.txtRasidIfSauditoMidGreen.delete(0, tk.END)
                self.txtRasidIfSauditoMidGreen.insert(0, f"--")
                self.txtRasidIfSauditoMidGreen.config(state=tk.DISABLED)

                # What is the Rasid id we Substract FORIGNER to go to HIGH GREEN 
                self.txtRasidIfForignertoHiGreen.config(state=tk.NORMAL)
                self.txtRasidIfForignertoHiGreen.delete(0, tk.END)
                self.txtRasidIfForignertoHiGreen.insert(0, f"{max_forigner_to_mid_green}")
                self.txtRasidIfForignertoHiGreen.config(state=tk.DISABLED)
                # What is the Rasid id we add SAUDIS to go to HIGH GREEN
                self.txtRasidIfSauditoHiGreen.config(state=tk.NORMAL)
                self.txtRasidIfSauditoHiGreen.delete(0, tk.END)
                self.txtRasidIfSauditoHiGreen.insert(0, f"{max_forigner_to_mid_green}")
                self.txtRasidIfSauditoHiGreen.config(state=tk.DISABLED)

                #  What is the Rasid if we substract FORIGNER to go to the PLATINIUM green :
                maxForignerCount = self.get_minimum_forigner_subtraction_count(
                FixedCurveValuePlatinium, FixedValuePlatinium, saudiEmp, totalEmp)
                RasidIfForignertoPlat =  self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp-maxForignerCount)
                self.txtRasidIfForignertoPlat.config(state=tk.NORMAL)
                self.txtRasidIfForignertoPlat.delete(0, tk.END)
                self.txtRasidIfForignertoPlat.insert(0, f"{RasidIfForignertoPlat}")
                self.txtRasidIfForignertoPlat.config(state=tk.DISABLED)

                # What is the Rasid id we add SAUDIS to go to PLATINIUM green
                minimumSaudiCount = self.get_minimum_saudi_addition_count(
                FixedCurveValuePlatinium, FixedValuePlatinium, saudiEmp, totalEmp)
                RasidIfSaudistoPlat = self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp + minimumSaudiCount, totalEmp+ minimumSaudiCount)
                self.txtRasidIfSauditoPlat.config(state=tk.NORMAL)
                self.txtRasidIfSauditoPlat.delete(0, tk.END)
                self.txtRasidIfSauditoPlat.insert(0, f"{RasidIfSaudistoPlat}")
                self.txtRasidIfSauditoPlat.config(state=tk.DISABLED)

            if nitaq_level == "بلاتيني":
                max_forigner_to_add = self.get_max_forigner_addition_count(
                    FixedCurveValuePlatinium, FixedValuePlatinium, saudiEmp, totalEmp)
                max_saudi_to_substract = self.get_max_saudi_substraction_count(
                    FixedCurveValuePlatinium, FixedValuePlatinium, saudiEmp, totalEmp)
                max_forigner_to_mid_green = self.get_max_forigner_addition_count(
                    FixedCurveValueMidGreen, FixedValueMidGreen, saudiEmp, totalEmp)
                max_saudi_to_sub_to_low_green = self.get_max_saudi_substraction_count(
                    FixedCurveValueLowGreen, FixedValueLowGreen, saudiEmp, totalEmp)

                # What is the Rasid if we Substract FORIGNER to go to Mid GREEN 
                self.txtRasidIfForignertoMidGreen.config(state=tk.NORMAL)
                self.txtRasidIfForignertoMidGreen.delete(0, tk.END)
                self.txtRasidIfForignertoMidGreen.insert(0, f"--")
                self.txtRasidIfForignertoMidGreen.config(state=tk.DISABLED)
                # What is the Rasid id we add SAUDIS to go to Mid GREEN
                self.txtRasidIfSauditoMidGreen.config(state=tk.NORMAL)
                self.txtRasidIfSauditoMidGreen.delete(0, tk.END)
                self.txtRasidIfSauditoMidGreen.insert(0, f"--")
                self.txtRasidIfSauditoMidGreen.config(state=tk.DISABLED)

                # What is the Rasid if we Substract FORIGNER to go to HIGH GREEN 
                self.txtRasidIfForignertoHiGreen.config(state=tk.NORMAL)
                self.txtRasidIfForignertoHiGreen.delete(0, tk.END)
                self.txtRasidIfForignertoHiGreen.insert(0, f"--")
                self.txtRasidIfForignertoHiGreen.config(state=tk.DISABLED)
                # What is the Rasid id we add SAUDIS to go to HIGH GREEN
                self.txtRasidIfSauditoHiGreen.config(state=tk.NORMAL)
                self.txtRasidIfSauditoHiGreen.delete(0, tk.END)
                self.txtRasidIfSauditoHiGreen.insert(0, f"--")
                self.txtRasidIfSauditoHiGreen.config(state=tk.DISABLED)

                #  What is the Rasid if we substract FORIGNER to go to the PLATINIUM green :
                self.txtRasidIfForignertoPlat.config(state=tk.NORMAL)
                self.txtRasidIfForignertoPlat.delete(0, tk.END)
                self.txtRasidIfForignertoPlat.insert(0, f"{max_forigner_to_mid_green}")
                self.txtRasidIfForignertoPlat.config(state=tk.DISABLED)

                # What is the Rasid id we add SAUDIS to go to PLATINIUM green
                self.txtRasidIfSauditoPlat.config(state=tk.NORMAL)
                self.txtRasidIfSauditoPlat.delete(0, tk.END)
                self.txtRasidIfSauditoPlat.insert(0, f"{max_forigner_to_mid_green}")
                self.txtRasidIfSauditoPlat.config(state=tk.DISABLED)


            self.txtMaxForigner.config(state=tk.NORMAL)
            self.txtMaxForigner.delete(0, tk.END)
            self.txtMaxForigner.insert(0, f"{max_forigner_to_add}")
            self.txtMaxForigner.config(state=tk.DISABLED)

            self.txtMaxSaudi.config(state=tk.NORMAL)
            self.txtMaxSaudi.delete(0, tk.END)
            self.txtMaxSaudi.insert(0, f"{max_saudi_to_substract}")
            self.txtMaxSaudi.config(state=tk.DISABLED)

            self.txtForignerizm.config(state=tk.NORMAL)
            self.txtForignerizm.delete(0, tk.END)
            self.txtForignerizm.insert(0, f"{max_forigner_to_mid_green}")
            self.txtForignerizm.config(state=tk.DISABLED)

            self.txtEliminateSaudiToLowGreen.config(state=tk.NORMAL)
            self.txtEliminateSaudiToLowGreen.delete(0, tk.END)
            self.txtEliminateSaudiToLowGreen.insert(
                0, f"{max_saudi_to_sub_to_low_green}")
            self.txtEliminateSaudiToLowGreen.config(state=tk.DISABLED)
            self.root.update()




        except ValueError:
            print(f"Error in calculation: {e}")

    # Get Saudizm
    def get_saudizm(self, saudi, total):
        return (saudi / total) * 100 if total > 0 else 0

    def get_nitaq(self, saudizm, minLowGreen, minMidGreen, minHighGreen, minPlatinium):
        if saudizm >= minPlatinium:
            return ("بلاتيني", "darkseagreen4")

        if (saudizm < minPlatinium) & (saudizm >= minHighGreen):
            return ("أخضر مرتفع", "chartreuse4")

        if (saudizm < minHighGreen) & (saudizm >= minMidGreen):
            return ("أخضر متوسط", "chartreuse1")

        if (saudizm < minMidGreen) & (saudizm >= minLowGreen):
            return ("أخضر منخفض", "aquamarine1")

        if (saudizm < minLowGreen):
            return ("احمر", "firebrick1")

    def calculate_minimum_requirements(self, totalEmp):
        try:
            # Extract the values from the entries
            FixedCurveValueLowGreen = float(
                self.txtFixedCurveValueLowGreen.get())
            FixedValueLowGreen = float(self.txtFixedValueLowGreen.get())

            FixedCurveValueMidGreen = float(
                self.txtFixedCurveValueMidGreen.get())
            FixedValueMidGreen = float(self.txtFixedValueMidGreen.get())

            FixedCurveValueHiGreen = float(
                self.txtFixedCurveValueHighGreen.get())
            FixedValueHiGreen = float(self.txtFixedHighGreen.get())

            FixedCurveValuePlatinium = float(
                self.txtFixedCurveValuePlatinium.get())
            FixedValuePlatinium = float(self.txtFixedValuePlatinium.get())

            # Calculate and update the minimum requirement fields for LOWGREEN
            minLowGreen = self.calculate_minimum_required_for_nitaq(
                FixedCurveValueLowGreen, totalEmp, FixedValueLowGreen)
            self.txtMinimumRequireLowGreen.config(state=tk.NORMAL)
            self.txtMinimumRequireLowGreen.delete(0, tk.END)
            self.txtMinimumRequireLowGreen.insert(0, f"{minLowGreen:.2f}")
            self.txtMinimumRequireLowGreen.config(state=tk.DISABLED)

            # Calculate and update the minimum requirement fields for MIDGREEN
            minMidGreen = self.calculate_minimum_required_for_nitaq(
                FixedCurveValueMidGreen, totalEmp, FixedValueMidGreen)
            self.txtMinimumRequireMidGreen.config(state=tk.NORMAL)
            self.txtMinimumRequireMidGreen.delete(0, tk.END)
            self.txtMinimumRequireMidGreen.insert(0, f"{minMidGreen:.2f}")
            self.txtMinimumRequireMidGreen.config(state=tk.DISABLED)

            # Calculate and update the minimum requirement fields for HIGREEN
            minHiGreen = self.calculate_minimum_required_for_nitaq(
                FixedCurveValueHiGreen, totalEmp, FixedValueHiGreen)
            self.txtMinimumRequireHighGreen.config(state=tk.NORMAL)
            self.txtMinimumRequireHighGreen.delete(0, tk.END)
            self.txtMinimumRequireHighGreen.insert(0, f"{minHiGreen:.2f}")
            self.txtMinimumRequireHighGreen.config(state=tk.DISABLED)

            # Calculate and update the minimum requirement fields for PLATINIUM
            minPlatinium = self.calculate_minimum_required_for_nitaq(
                FixedCurveValuePlatinium, totalEmp, FixedValuePlatinium)
            self.txtMinimumRequirePlatinium.config(state=tk.NORMAL)
            self.txtMinimumRequirePlatinium.delete(0, tk.END)
            self.txtMinimumRequirePlatinium.insert(0, f"{minPlatinium:.2f}")
            self.txtMinimumRequirePlatinium.config(state=tk.DISABLED)

        except ValueError as e:
            print(f"Error in minimum requirements calculation: {e}")

    def calculate_minimum_required_for_nitaq(self, m, s, th):
        return m * log(s) + th

    def get_minimum_saudi_addition_count(self, fixedCurveValue, fixedValueYear, saudiEmp, totalEmp):
        inc = -1
        while True:
            inc += 0.01
            saudizm = ((saudiEmp + inc) / (totalEmp + inc)) * 100
            min_req = self.calculate_minimum_required_for_nitaq(
                fixedCurveValue, totalEmp + inc, fixedValueYear)
            if saudizm > min_req:
                break
        return max(ceil(inc), 0)

    def get_minimum_forigner_subtraction_count(self, fixedCurveValue, fixedValueYear, saudiEmp, totalEmp):
        inc = -1
        while True:
            inc += 0.01
            saudizm = (saudiEmp / (totalEmp - inc)) * 100
            min_req = self.calculate_minimum_required_for_nitaq(
                fixedCurveValue, totalEmp - inc, fixedValueYear)
            if saudizm > min_req:
                break
        return max(ceil(inc), 0)

   # Calculate رصيد الاستقطاب
    def get_max_forigner_addition_count(self, fixedCurveValue, fixedValueYear, saudiEmp, totalEmp):
        inc = -1
        while True:
            inc += 0.01
            saudizm = (saudiEmp / (totalEmp + inc)) * 100
            min_req = self.calculate_minimum_required_for_nitaq(
                fixedCurveValue, totalEmp + inc, fixedValueYear)
            if saudizm < min_req:
                break
        return max(int(inc), 0)

    def get_max_saudi_substraction_count(self, fixedCurveValue, fixedValueYear, saudiEmp, totalEmp):
        inc = -1
        while True:
            inc += 0.01
            saudizm = ((saudiEmp - inc) / (totalEmp - inc)) * 100
            min_req = self.calculate_minimum_required_for_nitaq(
                fixedCurveValue, totalEmp - inc, fixedValueYear)
            if saudizm < min_req:
                break
        return max(int(inc), 0)

    def run(self):
        self.root.mainloop()


if __name__ == "__main__":
    app = NitaqatApplication()
    app.run()
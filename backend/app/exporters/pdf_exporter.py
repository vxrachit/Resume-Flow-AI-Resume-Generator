from reportlab.lib.pagesizes import A4
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, ListFlowable, ListItem
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from datetime import datetime
import re
from reportlab.pdfgen import canvas


def add_page_number(canvas: canvas.Canvas, doc):
    page_num = canvas.getPageNumber()
    text = f"Page {page_num}"
    canvas.setFont("Helvetica", 9)
    canvas.setFillColor(colors.HexColor("#555555"))
    canvas.drawCentredString(A4[0] / 2.0, 15, text)  

def export_resume_pdf(full_name, email, phone, resume_data, filename):
    doc = SimpleDocTemplate(filename, pagesize=A4,
                            rightMargin=40, leftMargin=40,
                            topMargin=40, bottomMargin=40)
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle(name="ResumeHeaderName", fontSize=26, leading=30, alignment=TA_CENTER,
                              textColor=colors.white, fontName="Helvetica-Bold"))
    styles.add(ParagraphStyle(name="ResumeContact", fontSize=11, leading=14, alignment=TA_CENTER,
                              textColor=colors.HexColor("#D6EAF8"), fontName="Helvetica"))
    styles.add(ParagraphStyle(name="ResumeSectionHeader", fontSize=14, leading=18, spaceAfter=6, spaceBefore=20,
                              textColor=colors.HexColor("#1A5276"), fontName="Helvetica-Bold"))
    styles.add(ParagraphStyle(name="ResumeBody", fontSize=11, leading=16, spaceAfter=6,
                              fontName="Helvetica", textColor=colors.HexColor("#2C3E50")))
    styles.add(ParagraphStyle(name="ResumeBullet", fontSize=11, leading=16, leftIndent=14,
                              fontName="Helvetica", textColor=colors.HexColor("#2C3E50")))
    styles.add(ParagraphStyle(name="ResumeSubtle", fontSize=9, leading=12,
                              textColor=colors.HexColor("#7D7D7D"), fontName="Helvetica-Oblique"))    
    styles.add(ParagraphStyle(name="CustomBodyText", fontSize=9, leading=12, spaceAfter=4,
                              fontName="Helvetica", textColor=colors.HexColor("#212F3D")))

    elements = []

    header_data = [
        [Paragraph(f"{full_name} — Resume", styles["ResumeHeaderName"])],
        [Paragraph(f"{email} | {phone}", styles["ResumeContact"])]
    ]
    header_table = Table(header_data, colWidths=[480])
    header_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#154360")),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#2874A6")),
    ]))
    elements.append(header_table)
    elements.append(Spacer(1, 20))


    summary = resume_data.get("summary", "")
    if summary:
        elements.append(Paragraph("Professional Summary", styles["ResumeSectionHeader"]))
        elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#2874A6")))
        elements.append(Spacer(1, 6))
        elements.append(Paragraph(summary, styles["ResumeBody"]))

    skills = resume_data.get("skills", [])
    if skills:
        elements.append(Spacer(1, 10))
        elements.append(Paragraph("Key Skills", styles["ResumeSectionHeader"]))
        elements.append(HRFlowable(width="100%", thickness=1.2, color=colors.HexColor("#2874A6")))
        elements.append(Spacer(1, 6))

        num_cols = 3
        skill_rows = [skills[i:i + num_cols] for i in range(0, len(skills), num_cols)]
        if len(skill_rows[-1]) < num_cols:
            skill_rows[-1] += [""] * (num_cols - len(skill_rows[-1]))

        skill_table_data = []

        for row in skill_rows:
            skill_table_data.append([
                Paragraph(skill, styles["CustomBodyText"]) if skill else ""
                for skill in row
            ])

        skill_table = Table(skill_table_data, colWidths=[150] * num_cols, hAlign="LEFT")
        skill_table.setStyle(TableStyle([
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("WORDWRAP", (0, 0), (-1, -1), "CJK"),
            ("TEXTCOLOR", (0, 0), (-1, -1), colors.HexColor("#212F3D")),
            ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#AAB7B8")),
            ("BACKGROUND", (0, 0), (-1, -1), colors.whitesmoke),
            ("LEFTPADDING", (0, 0), (-1, -1), 6),
            ("RIGHTPADDING", (0, 0), (-1, -1), 6),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ]))
        elements.append(skill_table)

    experience = resume_data.get("experience", [])
    if experience:
        elements.append(Paragraph("Work Experience", styles["ResumeSectionHeader"]))
        elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#2874A6")))
        elements.append(Spacer(1, 6))
        for exp in experience:
            header = f"{exp.get('title', '')} — {exp.get('company', '')}"
            if exp.get("location", ""):
                header += f", {exp['location']}"
            elements.append(Paragraph(header, styles["ResumeBody"]))
            if exp.get("dates", ""):
                elements.append(Paragraph(exp["dates"], styles["ResumeSubtle"]))
            bullets = exp.get("bullets", [])
            if bullets:
                exp_bullets = ListFlowable(
                    [ListItem(Paragraph(point, styles["ResumeBullet"]), bulletColor=colors.HexColor("#2874A6")) for point in bullets],
                    bulletType="bullet", start="•", leftIndent=14
                )
                elements.append(exp_bullets)

    projects = resume_data.get("projects", [])
    if projects:
        elements.append(Paragraph("Projects", styles["ResumeSectionHeader"]))
        elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#2874A6")))
        elements.append(Spacer(1, 6))
        for proj in projects:
            if proj.get("name", ""):
                elements.append(Paragraph(
                    proj["name"],
                    ParagraphStyle(
                        "ProjectName",
                        parent=styles["ResumeBody"],
                        fontName="Helvetica-Bold",
                        textColor=colors.HexColor("#1A5276"),
                        spaceAfter=4
                    )
                ))
            if proj.get("description", ""):
                elements.append(Paragraph(proj["description"], styles["ResumeBody"]))
            elements.append(Spacer(1, 6)) 

    certs = resume_data.get("certifications", [])
    if certs:
        elements.append(Paragraph("Certifications", styles["ResumeSectionHeader"]))
        elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#2874A6")))
        elements.append(Spacer(1, 6))
        cert_bullets = ListFlowable(
            [ListItem(Paragraph(cert, styles["ResumeBullet"]), bulletColor=colors.HexColor("#2874A6")) for cert in certs],
            bulletType="bullet", leftIndent=14
        )
        elements.append(cert_bullets)

    langs = resume_data.get("languages", [])
    if langs:
        elements.append(Paragraph("Languages", styles["ResumeSectionHeader"]))
        elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#2874A6")))
        elements.append(Spacer(1, 6))
        lang_bullets = ListFlowable(
            [ListItem(Paragraph(lang, styles["ResumeBullet"]), bulletColor=colors.HexColor("#2874A6")) for lang in langs],
            bulletType="bullet", leftIndent=14
        )
        elements.append(lang_bullets)

    education = resume_data.get("education", [])
    if education:
        elements.append(Paragraph("Education", styles["ResumeSectionHeader"]))
        elements.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#2874A6")))
        elements.append(Spacer(1, 6))
        for edu in education:
            elements.append(Paragraph(f"{edu.get('degree', '')} — {edu.get('institution', '')}", styles["ResumeBody"]))
            if edu.get("dates", ""):
                elements.append(Paragraph(edu["dates"], styles["ResumeSubtle"]))

    doc.build(elements, onFirstPage=add_page_number, onLaterPages=add_page_number)


def export_cover_letter_pdf(full_name, cover_text, job_desc, filename,
                            email=None, phone=None, company_name=None, city_state=None):
    doc = SimpleDocTemplate(filename, pagesize=A4,
                            rightMargin=40, leftMargin=40,
                            topMargin=40, bottomMargin=40)
    styles = getSampleStyleSheet()

    styles.add(ParagraphStyle(name="CLTitleHeader", fontSize=26, leading=32, alignment=TA_CENTER,
                              textColor=colors.white, fontName="Helvetica-Bold"))
    styles.add(ParagraphStyle(name="CLSectionHeader", fontSize=14, leading=18, spaceAfter=6, spaceBefore=18,
                              textColor=colors.HexColor("#1A5276"), fontName="Helvetica-Bold"))
    styles.add(ParagraphStyle(name="CLBody", fontSize=11, leading=18, spaceAfter=12,
                              fontName="Helvetica", alignment=TA_LEFT, textColor=colors.HexColor("#2C3E50")))
    styles.add(ParagraphStyle(name="CLSign", fontSize=11, leading=18, spaceAfter=10,
                              fontName="Helvetica-Bold", alignment=TA_LEFT, textColor=colors.HexColor("#1A5276")))
    styles.add(ParagraphStyle(name="CLSubtle", fontSize=10, leading=14,
                              textColor=colors.HexColor("#7D7D7D"), fontName="Helvetica-Oblique"))

    elements = []

    header_data = [[Paragraph("Cover Letter", styles["CLTitleHeader"])]]
    header_table = Table(header_data, colWidths=[480])
    header_table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#154360")),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 16),
        ("TOPPADDING", (0, 0), (-1, -1), 16),
        ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#2874A6")),
    ]))
    elements.append(header_table)
    elements.append(Spacer(1, 20))

    elements.append(Paragraph(datetime.now().strftime("%B %d, %Y"), styles["CLSubtle"]))
    elements.append(Spacer(1, 20))

    if company_name and company_name.lower() not in ["company name", ""]:
        elements.append(Paragraph(company_name, styles["CLBody"]))
    if city_state and city_state.lower() not in ["city, state", ""]:
        elements.append(Paragraph(city_state, styles["CLSubtle"]))
    elements.append(Spacer(1, 16))

    if company_name and company_name.lower() not in ["company name", ""]:
        salutation = f"Dear {company_name} Hiring Team,"
    else:
        salutation = "Dear Hiring Manager,"
    elements.append(Paragraph(salutation, styles["CLBody"]))
    elements.append(Spacer(1, 12))

    if cover_text:
        paras = [p.strip() for p in cover_text.split("\n") if p.strip()]
        for para in paras:
            elements.append(Paragraph(para, styles["CLBody"]))
    else:
        elements.append(Paragraph(
            f"I am writing to express my interest in the {job_desc} role. "
            "With my background and skills, I am confident I can make a valuable contribution to your team.",
            styles["CLBody"]
        ))

    elements.append(Spacer(1, 20))
    elements.append(Paragraph("Sincerely,", styles["CLSign"]))
    elements.append(Spacer(1, 4))
    elements.append(Paragraph(full_name, styles["CLSign"]))

    doc.build(elements, onFirstPage=add_page_number, onLaterPages=add_page_number)

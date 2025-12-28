import { VisionMissionSection } from "@/components/vision-mission-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Users, BookOpen, Shield } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
	const leadership = [
		{
			name: "Dr. Grace Wanjiku",
			role: "Executive Director",
			bio: "With over 15 years in ministry and counseling, Grace leads our vision of holistic spiritual care.",
			image: "/professional-woman-smiling.png",
		},
		{
			name: "Pastor David Kiprotich",
			role: "Director of Discipleship",
			bio: "David oversees our small group programs and mentorship initiatives with passion for community building.",
			image: "/professional-man-smiling.png",
		},
		{
			name: "Dr. Mary Njeri",
			role: "Clinical Director",
			bio: "Licensed therapist specializing in faith-based counseling and trauma-informed care.",
			image: "/professional-woman-therapist.png",
		},
	];

	return (
		<>
			<main>
				{/* Hero Section */}
				<section className="bg-gradient-to-b from-primary/5 to-background py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
							About CCMWA
						</h1>{" "}
						{/* Updated organization name to CCMWA */}
						<p className="text-xl text-muted-foreground text-pretty">
							Founded in 2010, we've been walking alongside
							individuals and families on their journey of faith,
							healing, and spiritual growth for over a decade.
						</p>
					</div>
				</section>

				{/* Our Story */}
				<section id="mission" className="py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-8 text-center">
							Our Story
						</h2>
						<div className="prose prose-lg max-w-none text-muted-foreground">
							<p className="leading-relaxed mb-6">
								CCMWA began with a simple vision: to create a
								place where faith and professional care
								intersect to{" "}
								{/* Updated organization name to CCMWA */}
								bring healing and hope to our community. What
								started as a small group meeting in a living
								room has grown into a comprehensive ministry
								serving hundreds of individuals and families.
							</p>
							<p className="leading-relaxed mb-6">
								We believe that spiritual growth and emotional
								wellness go hand in hand. Our approach combines
								biblical wisdom with evidence-based practices,
								creating a unique environment where people can
								address both their spiritual questions and
								emotional needs.
							</p>
							<p className="leading-relaxed">
								Today, we offer a full range of services
								including small group discipleship, individual
								and family counseling, spiritual direction, and
								community events. Our team of licensed
								professionals and trained volunteers work
								together to provide comprehensive care for the
								whole person.
							</p>
						</div>
					</div>
				</section>

				{/* Vision, Mission & Core Values */}
				<VisionMissionSection />

				{/* Leadership Team */}
				<section id="team" className="py-16 bg-muted/30">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-12 text-center">
							Leadership Team
						</h2>
						<div className="grid md:grid-cols-3 gap-8">
							{leadership.map((leader, index) => (
								<Card key={index} className="text-center">
									<CardHeader>
										<div className="mx-auto mb-4">
											<img
												src={
													leader.image ||
													"/placeholder.svg"
												}
												alt={leader.name}
												className="w-32 h-32 rounded-full object-cover mx-auto"
											/>
										</div>
										<CardTitle className="text-xl">
											{leader.name}
										</CardTitle>
										<Badge
											variant="secondary"
											className="mx-auto w-fit"
										>
											{leader.role}
										</Badge>
									</CardHeader>
									<CardContent>
										<p className="text-muted-foreground text-sm leading-relaxed">
											{leader.bio}
										</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				{/* What We Believe */}
				<section className="py-16">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-8 text-center">
							What We Believe
						</h2>
						<div className="max-w-4xl mx-auto mb-12">
							<p className="text-lg text-muted-foreground leading-relaxed mb-6">
								At CCMWA, our faith is grounded in the Word of
								God and the hope of the gospel. In summary, we
								believe:
							</p>

							<div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
								<div className="space-y-2">
									<p className="flex items-start gap-2">
										<span className="text-primary font-bold"></span>
										<span>
											<strong>The Bible</strong> – God's
											inspired, authoritative Word and the
											final guide for life and faith.
										</span>
									</p>
									<p className="flex items-start gap-2">
										<span className="text-primary font-bold"></span>
										<span>
											<strong>God</strong> – One God in
											three Persons: Father, Son, and Holy
											Spirit.
										</span>
									</p>
									<p className="flex items-start gap-2">
										<span className="text-primary font-bold"></span>
										<span>
											<strong>Jesus Christ</strong> –
											Fully God and fully man; His life,
											death, and resurrection bring
											salvation.
										</span>
									</p>
									<p className="flex items-start gap-2">
										<span className="text-primary font-bold"></span>
										<span>
											<strong>The Holy Spirit</strong> –
											Convicts, transforms, and empowers
											believers for holy living and
											service.
										</span>
									</p>
									<p className="flex items-start gap-2">
										<span className="text-primary font-bold"></span>
										<span>
											<strong>Humanity</strong> – All are
											created in God's image yet fallen,
											in need of salvation through Christ.
										</span>
									</p>
									<p className="flex items-start gap-2">
										<span className="text-primary font-bold"></span>
										<span>
											<strong>Salvation</strong> – By
											grace alone, through faith alone, in
											Christ alone.
										</span>
									</p>
								</div>
								<div className="space-y-2">
									<p className="flex items-start gap-2">
										<span className="text-primary font-bold"></span>
										<span>
											<strong>The Church</strong> – The
											body of Christ, called to worship,
											discipleship, service, and mission.
										</span>
									</p>
									<p className="flex items-start gap-2">
										<span className="text-primary font-bold"></span>
										<span>
											<strong>Christian Living</strong> –
											Believers are called to holiness,
											love, and compassionate service.
										</span>
									</p>
									<p className="flex items-start gap-2">
										<span className="text-primary font-bold"></span>
										<span>
											<strong>Marriage & Family</strong> –
											A sacred covenant between one man
											and one woman, reflecting Christ and
											the church.
										</span>
									</p>
									<p className="flex items-start gap-2">
										<span className="text-primary font-bold"></span>
										<span>
											<strong>
												Counseling & Soul-Care
											</strong>{" "}
											– Scripture provides sufficient
											wisdom for healing, hope, and
											transformation.
										</span>
									</p>
									<p className="flex items-start gap-2">
										<span className="text-primary font-bold"></span>
										<span>
											<strong>The Future Hope</strong> –
											Christ will return, and believers
											will share eternal life with God.
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Detailed Statement of Faith */}
				<section id="doctrinal-basis" className="py-16 bg-muted/30">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-8 text-center">
							Our Beliefs and Statement of Faith
						</h2>
						<p className="text-lg text-muted-foreground text-center mb-12 max-w-4xl mx-auto">
							At CCMWA, we are committed to the authority of
							Scripture, the centrality of Christ, and the
							transformative work of the gospel in every aspect of
							life. Our faith shapes our mission of soul-care,
							wellness, and discipleship.
						</p>

						<div className="grid lg:grid-cols-2 gap-8">
							<Card className="h-full">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<BookOpen className="h-5 w-5 text-primary" />
										1. The Bible
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										We believe the Scriptures of the Old and
										New Testaments are the inspired,
										infallible, and authoritative Word of
										God, the final rule for faith and
										practice (2 Timothy 3:16–17; 2 Peter
										1:20–21).
									</p>
								</CardContent>
							</Card>

							<Card className="h-full">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Shield className="h-5 w-5 text-primary" />
										2. God
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										We believe in one true God, eternally
										existing in three Persons—Father, Son,
										and Holy Spirit—equal in essence, power,
										and glory (Deuteronomy 6:4; Matthew
										28:19; 2 Corinthians 13:14).
									</p>
								</CardContent>
							</Card>

							<Card className="h-full">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Heart className="h-5 w-5 text-primary" />
										3. Jesus Christ
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										We believe in the full deity and
										humanity of our Lord Jesus Christ, His
										virgin birth, sinless life, atoning
										death on the cross, bodily resurrection,
										ascension to the right hand of the
										Father, and His future return in power
										and glory (John 1:1, 14; Philippians
										2:5–11; 1 Thessalonians 4:16–17).
									</p>
								</CardContent>
							</Card>

							<Card className="h-full">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Users className="h-5 w-5 text-primary" />
										4. The Holy Spirit
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										We believe the Holy Spirit convicts of
										sin, regenerates hearts, indwells
										believers, empowers for holy living, and
										equips the church for service and
										mission (John 16:7–13; Acts 1:8;
										Galatians 5:22–23).
									</p>
								</CardContent>
							</Card>

							<Card className="h-full">
								<CardHeader>
									<CardTitle>5. Humanity</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										We believe all people are created in the
										image of God but have fallen into sin
										and are in need of salvation through
										Christ (Genesis 1:27; Romans 3:23).
									</p>
								</CardContent>
							</Card>

							<Card className="h-full">
								<CardHeader>
									<CardTitle>6. Salvation</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										We believe salvation is by grace alone,
										through faith alone, in Christ alone.
										All who repent and believe are
										justified, adopted into God's family,
										and assured of eternal life (Ephesians
										2:8–9; Romans 5:1; John 3:16).
									</p>
								</CardContent>
							</Card>

							<Card className="h-full">
								<CardHeader>
									<CardTitle>7. The Church</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										We believe the universal church is the
										body of Christ, made up of all
										believers. The local church exists to
										glorify God through worship, teaching,
										fellowship, service, and the Great
										Commission (Matthew 28:18–20; Acts
										2:42–47).
									</p>
								</CardContent>
							</Card>

							<Card className="h-full">
								<CardHeader>
									<CardTitle>8. Christian Living</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										We believe believers are called to walk
										in holiness, grow in discipleship, and
										reflect Christ's love through acts of
										service, compassion, and witness (Romans
										12:1–2; Colossians 3:12–17).
									</p>
								</CardContent>
							</Card>

							<Card className="h-full">
								<CardHeader>
									<CardTitle>
										9. Marriage and Family
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										We believe marriage is a sacred covenant
										between one man and one woman, designed
										by God as the foundation for family and
										society, reflecting Christ's
										relationship with the church (Genesis
										2:24; Ephesians 5:22–33).
									</p>
								</CardContent>
							</Card>

							<Card className="h-full">
								<CardHeader>
									<CardTitle>
										10. Counseling and Soul-Care
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										We believe Scripture provides sufficient
										guidance for the care of the soul,
										offering wisdom, healing, and hope
										through Christ. We affirm the importance
										of counseling, discipleship, and
										pastoral care rooted in the Word of God
										(Psalm 19:7; 2 Peter 1:3–4; Galatians
										6:1–2).
									</p>
								</CardContent>
							</Card>

							<Card className="h-full">
								<CardHeader>
									<CardTitle>11. The Future Hope</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										We believe in the bodily resurrection of
										both the saved and the lost: the saved
										to everlasting life with God, and the
										lost to eternal separation from Him
										(John 5:28–29; Revelation 21:1–4).
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* Faith Tradition and Theological Approach */}
				<section className="py-16">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-8 text-center">
							CCMWA Faith Tradition and Theological Approach
						</h2>

						<div className="max-w-4xl mx-auto space-y-8">
							<div className="text-center bg-primary/5 rounded-lg p-8">
								<p className="text-lg text-muted-foreground mb-4">
									At CCMWA, we believe that true mental and
									emotional wellness flows from a living
									relationship with Jesus Christ. Scripture
									promises:
								</p>
								<blockquote className="text-xl text-primary font-medium mb-6">
									"You will keep in perfect peace those whose
									minds are steadfast, because they trust in
									You." (Isaiah 26:3)
								</blockquote>
							</div>

							<div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
								<p className="leading-relaxed">
									Rooted in the historic Christian faith, our
									counseling and soul-care ministry is wholly
									guided by the all-sufficient Word of God:
								</p>
								<blockquote className="border-l-4 border-primary pl-4 italic text-primary">
									"Your word is a lamp for my feet, a light on
									my path." (Psalm 119:105)
								</blockquote>

								<p className="leading-relaxed">
									We affirm the sufficiency of Scripture:
								</p>
								<blockquote className="border-l-4 border-primary pl-4 italic text-primary">
									"All Scripture is breathed out by God and
									profitable for teaching, for reproof, for
									correction, and for training in
									righteousness, that the man of God may be
									complete, equipped for every good work." (2
									Timothy 3:16–17)
								</blockquote>

								<p className="leading-relaxed">
									And we trust in its power to reach the
									depths of the human heart:
								</p>
								<blockquote className="border-l-4 border-primary pl-4 italic text-primary">
									"For the word of God is living and active,
									sharper than any two-edged sword, piercing
									to the division of soul and of spirit, of
									joints and of marrow, and discerning the
									thoughts and intentions of the heart."
									(Hebrews 4:12)
								</blockquote>

								<p className="leading-relaxed">
									We are committed to the holistic care of
									spirit, soul, and body, trusting God's
									promise:
								</p>
								<blockquote className="border-l-4 border-primary pl-4 italic text-primary">
									"May the God of peace Himself sanctify you
									completely." (1 Thessalonians 5:23)
								</blockquote>
							</div>
						</div>
					</div>
				</section>

				{/* Embracing Our Faith Tradition */}
				<section className="py-16 bg-muted/30">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-8 text-center">
							Embracing Our Faith Tradition
						</h2>

						<div className="max-w-4xl mx-auto">
							<p className="text-lg text-muted-foreground leading-relaxed mb-8">
								Our faith tradition provides the unshakable
								foundation for understanding the human heart and
								experience. We affirm that God's Word is
								sufficient for counseling, comfort, correction,
								and hope. In every session, we turn to the
								Scriptures and the work of the Holy Spirit to
								address life's struggles and to direct people
								toward Christ.
							</p>

							<p className="text-lg text-muted-foreground leading-relaxed">
								Our counselors are equipped not to integrate
								secular theories but to apply biblical truth to
								real-life challenges—fostering a safe space for
								repentance, renewal, and growth in grace.
							</p>
						</div>
					</div>
				</section>

				{/* Theological Framework for Healing */}
				<section className="py-16">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-8 text-center">
							A Theological Framework for Healing
						</h2>

						<div className="max-w-4xl mx-auto mb-8">
							<p className="text-lg text-muted-foreground leading-relaxed text-center">
								We believe that every person is created in the
								image of God, endowed with dignity and worth
								(Genesis 1:27). Our approach rests on:
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							<Card className="text-center">
								<CardHeader>
									<CardTitle className="flex flex-col items-center gap-2">
										The Importance of Community
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										We encourage fellowship within the body
										of Christ, knowing that growth and
										healing occur in godly relationships
										(Hebrews 10:24–25).
									</p>
								</CardContent>
							</Card>

							<Card className="text-center">
								<CardHeader>
									<CardTitle className="flex flex-col items-center gap-2">
										Grace and Forgiveness
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										We emphasize the transforming power of
										God's grace through Christ, helping
										believers find freedom from guilt and
										shame by resting in His finished work
										(Ephesians 2:8–9).
									</p>
								</CardContent>
							</Card>

							<Card className="text-center">
								<CardHeader>
									<CardTitle className="flex flex-col items-center gap-2">
										Hope and Restoration
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										We believe no one is beyond God's
										redeeming power. In Christ, broken lives
										are restored, renewed, and made whole
										(Jeremiah 29:11; 2 Corinthians 5:17).
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* Biblical Counseling in Practice */}
				<section className="py-16 bg-muted/30">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-8 text-center">
							Biblical Counseling in Practice
						</h2>

						<div className="max-w-4xl mx-auto space-y-6">
							<p className="text-lg text-muted-foreground leading-relaxed">
								At CCMWA, counseling is ministry of the Word—an
								act of discipleship and care. We come alongside
								individuals and families with prayer,
								encouragement, and Scripture, pointing always to
								Christ as the source of wisdom, peace, and
								transformation.
							</p>

							<p className="text-lg text-muted-foreground leading-relaxed">
								We do not integrate secular psychology into our
								practice; instead, we uphold the sufficiency of
								Scripture and the lordship of Christ as the
								foundation for all counsel and care (2 Timothy
								3:16–17; Hebrews 4:12).
							</p>
						</div>
					</div>
				</section>

				{/* Soul-Care Mission */}
				<section className="py-16">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-12 text-center">
							Soul-Care. Wellness. Discipleship.
						</h2>

						<div className="grid md:grid-cols-3 gap-8">
							<Card className="text-center">
								<CardHeader>
									<CardTitle className="flex flex-col items-center gap-2">
										Soul-Care
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										Restoring broken hearts through the
										gospel of Christ (Psalm 147:3).
									</p>
								</CardContent>
							</Card>

							<Card className="text-center">
								<CardHeader>
									<CardTitle className="flex flex-col items-center gap-2">
										Wellness
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										Nurturing whole-person health in spirit,
										soul, and body through God's truth (1
										Thessalonians 5:23).
									</p>
								</CardContent>
							</Card>

							<Card className="text-center">
								<CardHeader>
									<CardTitle className="flex flex-col items-center gap-2">
										Discipleship
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground leading-relaxed">
										Equipping believers and families to grow
										in maturity and Christlikeness
										(Colossians 1:28).
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* Our Story: The Birth of CCMWA */}
				<section id="governance" className="py-16 bg-primary/5">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl font-bold text-foreground mb-8">
							Our Story: The Birth of CCMWA
						</h2>

						<div className="bg-background rounded-lg p-8 shadow-sm">
							<p className="text-lg text-muted-foreground leading-relaxed mb-6">
								The Christian Counselling and Mental Wellness
								Association (CCMWA) was founded with a sacred
								burden: to bring Christ-centered healing to the
								hurting, strength to the weary, and
								transformation to communities through biblical
								counseling and soul care.
							</p>

							<div className="border-l-4 border-primary pl-6">
								<p className="text-sm text-muted-foreground mb-2">
									✨ Founding Scripture:
								</p>
								<blockquote className="text-xl text-primary font-medium">
									"He heals the brokenhearted and binds up
									their wounds." (Psalm 147:3)
								</blockquote>
							</div>
						</div>
					</div>
				</section>

				{/* Pastor Martin Leadership */}
				<section id="team" className="py-16">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl font-bold text-foreground mb-12 text-center">
							Leadership
						</h2>

						<Card className="max-w-4xl mx-auto">
							<CardHeader className="text-center">
								<div className="mx-auto mb-4">
									<div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
										<Users className="h-16 w-16 text-primary" />
									</div>
								</div>
								<CardTitle className="text-2xl">
									Pst. Martin K. Mwangi
								</CardTitle>
								<Badge
									variant="secondary"
									className="mx-auto w-fit text-sm"
								>
									Team Leader
								</Badge>
								<p className="text-lg text-primary font-medium mt-4">
									"Equipping. Guiding. Empowering."
								</p>
							</CardHeader>
							<CardContent className="space-y-6">
								<p className="text-muted-foreground leading-relaxed">
									Pst. Martin Mwangi is a servant of the
									gospel, an ordained minister, and Team
									Leader at CCMWA. With extensive training in
									Biblical Counseling, theology, and life
									coaching, he is passionate about equipping
									believers, strengthening families, and
									offering Christ-centered hope and guidance.
									His vision is to see CCMWA serve as a beacon
									of biblical wisdom and compassionate
									ministry, transforming lives through the
									power of the gospel.
								</p>

								<div className="bg-muted/30 rounded-lg p-6">
									<h4 className="font-semibold text-foreground mb-4">
										Education & Training
									</h4>
									<div className="space-y-3 text-sm text-muted-foreground">
										<p>
											•{" "}
											<strong>
												Biblical Counseling:
											</strong>{" "}
											Trained at the Biblical Counseling
											Center, pursuing ACBC certification
										</p>
										<p>
											• <strong>Academic:</strong> Diploma
											in Theology and Practical Ministry,
											pursuing Master of Divinity (M.Div)
										</p>
										<p>
											• <strong>Mental Health:</strong>{" "}
											Mental Health Coach (Light
											University), Diploma in Hope
											Coaching
										</p>
										<p>
											• <strong>Education:</strong>{" "}
											Bachelor of Education in Early
											Childhood Education
										</p>
										<p>
											• <strong>Counseling:</strong>{" "}
											Higher Diploma in Guidance and
											Psychological Counselling
										</p>
										<p>
											• <strong>Life Coaching:</strong>{" "}
											CBT Life Coach, Professional Life
											Coach certifications
										</p>
										<p>
											•{" "}
											<strong>
												Professional Memberships:
											</strong>{" "}
											ISSUP and ISSUP-Kenya member
										</p>
										<p>
											•{" "}
											<strong>
												Specialized Training:
											</strong>{" "}
											Universal Treatment Curriculum for
											Substance Use Disorders (UTC)
										</p>
									</div>
								</div>

								<div>
									<h4 className="font-semibold text-foreground mb-4">
										Leadership Vision for CCMWA
									</h4>
									<p className="text-muted-foreground leading-relaxed">
										Pastor Martin envisions CCMWA as a
										beacon of biblical wisdom and
										compassionate ministry—empowering
										individuals, families, and communities
										through discipleship counseling,
										theological education, and the practical
										application of Scripture. His leadership
										is anchored in equipping believers,
										strengthening families, and bringing
										hope to the hurting through the
										transforming power of the gospel. Under
										his guidance, CCMWA is building a strong
										foundation for biblical counseling,
										ensuring Christ-centered care that leads
										to lasting growth and renewal.
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</section>

				{/* Annual Report Section */}
				<section id="annual-report" className="py-16 bg-muted/30">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl font-bold text-foreground mb-6">
							Annual Report
						</h2>
						<p className="text-lg text-muted-foreground mb-8">
							View our comprehensive annual report to see how
							we've served our community and advanced our mission.
						</p>
						<Button asChild>
							<Link href="/about/annual-report">
								View 2024 Annual Report
							</Link>
						</Button>
					</div>
				</section>

				{/* Governance Section */}
				<section id="governance" className="py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl font-bold text-foreground mb-6">
							Governance
						</h2>
						<p className="text-lg text-muted-foreground mb-8">
							Learn about our board of directors, governance
							structure, and commitment to transparency.
						</p>
						<Button asChild>
							<Link href="/about/governance">
								View Governance Information
							</Link>
						</Button>
					</div>
				</section>

				{/* Uncover Section */}
				<section id="uncover" className="py-16 bg-muted/30">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl font-bold text-foreground mb-6">
							Uncover
						</h2>
						<p className="text-lg text-muted-foreground mb-8">
							Discover inspiring stories of transformation,
							healing, and hope from our community.
						</p>
						<Button asChild>
							<Link href="/about/uncover">Explore Stories</Link>
						</Button>
					</div>
				</section>

				{/* Jobs Section */}
				<section id="jobs" className="py-16">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl font-bold text-foreground mb-6">
							Join Our Team
						</h2>
						<p className="text-lg text-muted-foreground mb-8">
							Explore career opportunities and volunteer roles to
							serve with us.
						</p>
						<Button asChild>
							<Link href="/about/jobs">View Job Openings</Link>
						</Button>
					</div>
				</section>

				{/* Group Membership Section */}
				<section id="group-membership" className="py-16 bg-muted/30">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl font-bold text-foreground mb-6">
							Group Memberships for Churches
						</h2>
						<p className="text-lg text-muted-foreground mb-8">
							Learn how your church can join our group membership
							program to create a culture of care.
						</p>
						<Button asChild>
							<Link href="/about/group-membership">
								Learn More
							</Link>
						</Button>
					</div>
				</section>

				{/* Contact Us Section */}
				<section id="contact-us" className="py-16 bg-primary/5">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl font-bold text-foreground mb-6">
							Contact Us
						</h2>
						<p className="text-lg text-muted-foreground mb-8">
							Have questions? We'd love to hear from you.
						</p>
						<Button asChild>
							<Link href="/contact">Get in Touch</Link>
						</Button>
					</div>
				</section>
			</main>
		</>
	);
}
